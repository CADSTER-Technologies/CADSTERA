"use client";

import React, { useState, useRef } from "react";
import { FileUp, FileDown, CheckCircle2, AlertCircle } from "lucide-react";
import { saveAs } from "file-saver";

const PDFComparer: React.FC = () => {
    const [fileA, setFileA] = useState<File | null>(null);
    const [fileB, setFileB] = useState<File | null>(null);
    const [result, setResult] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [comparedPdfUrl, setComparedPdfUrl] = useState<string | null>(null);
    const [uploadStatusA, setUploadStatusA] = useState<string | null>(null);
    const [uploadStatusB, setUploadStatusB] = useState<string | null>(null);
    const [errorA, setErrorA] = useState<boolean>(false);
    const [errorB, setErrorB] = useState<boolean>(false);

    const resultRef = useRef<HTMLDivElement>(null);

    const handleFileAUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setFileA(file);
        setErrorA(false);
        setUploadStatusA(file ? "✅ Upload A file uploaded successfully!" : null);
    };

    const handleFileBUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setFileB(file);
        setErrorB(false);
        setUploadStatusB(file ? "✅ Upload B file uploaded successfully!" : null);
    };

    const comparePDF = async () => {
        setErrorA(false);
        setErrorB(false);

        if (!fileA && !fileB) {
            setErrorA(true);
            setErrorB(true);
            setResult("⚠️ Please upload both PDF files");
            return;
        } else if (!fileA) {
            setErrorA(true);
            setResult("⚠️ Please upload PDF A");
            return;
        } else if (!fileB) {
            setErrorB(true);
            setResult("⚠️ Please upload PDF B");
            return;
        }

        setLoading(true);
        setResult(null);
        setComparedPdfUrl(null);

        try {
            const formData = new FormData();
            formData.append("file1", fileA);
            formData.append("file2", fileB);

            const response = await fetch(
                "https://backend-production-2648.up.railway.app/api/compare/report",
                { method: "POST", body: formData }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Comparison failed");
            }

            const blob = await response.blob();
            const pdfUrl = URL.createObjectURL(blob);

            setComparedPdfUrl(pdfUrl);
            setResult("✔ Comparison Complete — View & Download Below");
        } catch (error: any) {
            console.error("Comparison error:", error);
            setResult(`❌ Comparison Failed: ${error.message}`);
        } finally {
            setLoading(false);
            setTimeout(() => {
                resultRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                });
            }, 100);
        }
    };

    const downloadComparedPDF = () => {
        if (!comparedPdfUrl) return;
        saveAs(comparedPdfUrl, "compared-pdf-result.pdf");
    };

    return (
        <div className="min-h-screen bg-black px-6 py-12 text-white">
            {/* Header */}
            <div className="flex items-center justify-center space-x-3 mb-8">
                <div className="p-2 rounded-lg bg-[#e95c2a]/20 border border-[#e95c2a] shadow-[0_0_10px_#e95c2a] w-16 h-16 flex items-center justify-center">
                    <img src="/pdflogo.png" alt="PDF Logo" className="w-full h-full object-contain" />
                </div>
                <h1 className="text-3xl font-extrabold text-[#e95c2a] drop-shadow-[0_0_15px_#e95c2a]">
                    PDF Comparer Tool
                </h1>
            </div>

            {/* PDF Upload Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {/* Upload PDF A */}
                <div className={`bg-[#1a1a1a] p-5 rounded-xl border-2 ${errorA ? 'border-red-500/60 shadow-[0_0_20px_rgba(239,68,68,0.4)]' : 'border-[#e95c2a]/40 shadow-[0_0_15px_rgba(233,92,42,0.3)]'
                    } transition-all hover:shadow-[0_0_25px_rgba(233,92,42,0.5)] hover:-translate-y-1`}>
                    <h2 className="text-lg font-semibold text-[#e95c2a] mb-3">Upload PDF A</h2>
                    <label className="cursor-pointer flex flex-col items-center border-dashed border-2 border-[#e95c2a] p-4 rounded-lg hover:bg-[#e95c2a]/10 transition">
                        <FileUp size={32} className="text-[#e95c2a]" />
                        <p className="mt-2 text-sm text-gray-300">Choose PDF File</p>
                        <input
                            type="file"
                            accept="application/pdf"
                            className="hidden"
                            onChange={handleFileAUpload}
                        />
                    </label>

                    {errorA && !fileA && (
                        <div className="mt-3 flex items-center space-x-2 text-red-400 bg-red-500/10 p-2 rounded-lg border border-red-500/30">
                            <AlertCircle size={16} />
                            <p className="text-xs font-medium">⚠️ Please upload PDF A file</p>
                        </div>
                    )}

                    {uploadStatusA && (
                        <div className="mt-3 space-y-2">
                            <div className="flex items-center space-x-2 text-green-400">
                                <CheckCircle2 size={16} />
                                <p className="text-xs font-medium">{uploadStatusA}</p>
                            </div>
                            {fileA && (
                                <div className="bg-[#e95c2a]/10 p-2 rounded-lg border border-[#e95c2a]/30">
                                    <p className="text-xs text-[#e95c2a] font-medium truncate">
                                        📄 {fileA.name}
                                    </p>
                                </div>
                            )}
                        </div>
                    )}

                    {fileA && !uploadStatusA && (
                        <p className="mt-3 text-xs text-gray-400 truncate">{fileA.name}</p>
                    )}
                </div>

                {/* Upload PDF B */}
                <div className={`bg-[#1a1a1a] p-5 rounded-xl border-2 ${errorB ? 'border-red-500/60 shadow-[0_0_20px_rgba(239,68,68,0.4)]' : 'border-[#e95c2a]/40 shadow-[0_0_15px_rgba(233,92,42,0.3)]'
                    } transition-all hover:shadow-[0_0_25px_rgba(233,92,42,0.5)] hover:-translate-y-1`}>
                    <h2 className="text-lg font-semibold text-[#e95c2a] mb-3">Upload PDF B</h2>
                    <label className="cursor-pointer flex flex-col items-center border-dashed border-2 border-[#e95c2a] p-4 rounded-lg hover:bg-[#e95c2a]/10 transition">
                        <FileUp size={32} className="text-[#e95c2a]" />
                        <p className="mt-2 text-sm text-gray-300">Choose PDF File</p>
                        <input
                            type="file"
                            accept="application/pdf"
                            className="hidden"
                            onChange={handleFileBUpload}
                        />
                    </label>

                    {errorB && !fileB && (
                        <div className="mt-3 flex items-center space-x-2 text-red-400 bg-red-500/10 p-2 rounded-lg border border-red-500/30">
                            <AlertCircle size={16} />
                            <p className="text-xs font-medium">⚠️ Please upload PDF B file</p>
                        </div>
                    )}

                    {uploadStatusB && (
                        <div className="mt-3 space-y-2">
                            <div className="flex items-center space-x-2 text-green-400">
                                <CheckCircle2 size={16} />
                                <p className="text-xs font-medium">{uploadStatusB}</p>
                            </div>
                            {fileB && (
                                <div className="bg-[#e95c2a]/10 p-2 rounded-lg border border-[#e95c2a]/30">
                                    <p className="text-xs text-[#e95c2a] font-medium truncate">
                                        📄 {fileB.name}
                                    </p>
                                </div>
                            )}
                        </div>
                    )}

                    {fileB && !uploadStatusB && (
                        <p className="mt-3 text-xs text-gray-400 truncate">{fileB.name}</p>
                    )}
                </div>
            </div>

            {/* Compare Button */}
            <div className="mt-8 flex justify-center">
                <button
                    onClick={comparePDF}
                    disabled={loading}
                    className="bg-[#e95c2a] text-white px-8 py-3 text-base font-semibold rounded-xl 
                    shadow-[0_0_20px_rgba(233,92,42,0.5)] hover:bg-[#ff6f3d] transition-all duration-300
                    hover:shadow-[0_0_30px_rgba(233,92,42,0.7)] hover:scale-105
                    flex items-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed
                    active:scale-95"
                >
                    <img src="/pdflogo.png" alt="PDF Logo" className="w-5 h-5 object-contain" />
                    <span>{loading ? "Comparing..." : "Compare PDF"}</span>
                </button>
            </div>

            {/* Result Section */}
            {result && comparedPdfUrl && (
                <div
                    ref={resultRef}
                    className="mt-10 p-6 rounded-xl bg-[#1a1a1a] border-2 border-[#e95c2a]/40 shadow-[0_0_20px_rgba(233,92,42,0.4)] max-w-5xl mx-auto"
                >
                    <h3 className="text-2xl font-bold text-[#e95c2a] mb-3">Comparison Result</h3>
                    <p className="text-lg mb-5 text-green-400">
                        {result}
                    </p>

                    <div className="mb-5">
                        <h4 className="text-lg font-semibold text-[#e95c2a] mb-3">
                            📄 Compared PDF Preview
                        </h4>
                        <div className="border-2 border-[#e95c2a]/40 rounded-lg overflow-hidden bg-black">
                            <iframe
                                src={comparedPdfUrl}
                                className="w-full h-[500px] bg-black"
                                title="Compared PDF Viewer"
                                style={{
                                    backgroundColor: '#000000',
                                    colorScheme: 'dark'
                                }}
                            />
                        </div>
                    </div>

                    <button
                        onClick={downloadComparedPDF}
                        className="bg-[#e95c2a] text-white px-6 py-2.5 rounded-lg font-semibold 
                        hover:bg-[#ff6f3d] transition-all duration-300 
                        shadow-[0_0_15px_rgba(233,92,42,0.5)] hover:shadow-[0_0_25px_rgba(233,92,42,0.7)]
                        flex items-center space-x-2 hover:scale-105 active:scale-95"
                    >
                        <FileDown size={18} />
                        <span>Download Compared PDF</span>
                    </button>
                </div>
            )}
        </div>
    );
};

export default PDFComparer;
