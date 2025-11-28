import React, { useState, useMemo } from 'react';
import { Download, FileSpreadsheet, Presentation, Search, Filter, ArrowUpDown, Star, TrendingUp, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import './Templatorss.css';

// ==================== TYPES ====================

interface Template {
  id: string;
  name: string;
  category: 'excel' | 'powerpoint';
  description: string;
  format: string;
  downloads: number;
  size: string;
  downloadUrl: string;
  featured?: boolean;
  dateAdded?: string;
  tags?: string[];
}

// ==================== TEMPLATE DATA ====================

const TEMPLATES: Template[] = [
  // ========== EXCEL TEMPLATES ==========
  {
    id: 'xls-001',
    name: 'Family Budget Worksheet',
    category: 'excel',
    description: 'Comprehensive family budget tracker with income, expenses, savings goals, and financial planning tools',
    format: 'XLSX',
    downloads: 5234,
    size: '384 KB',
    downloadUrl: '/templates/excel/Family-Budget-Worksheet-Template.xlsx',
    featured: true,
    dateAdded: '2024-11-01',
    tags: ['budget', 'finance', 'personal']
  },
  {
    id: 'xls-002',
    name: 'Invoice Template',
    category: 'excel',
    description: 'Professional invoice template with automatic tax calculations, payment terms, and client details',
    format: 'XLSX',
    downloads: 8920,
    size: '12 KB',
    downloadUrl: '/templates/excel/Invoice-Template.xlsx',
    featured: true,
    dateAdded: '2024-11-15',
    tags: ['invoice', 'business', 'accounting']
  },
  {
    id: 'xls-003',
    name: 'Marketing Project Management',
    category: 'excel',
    description: 'Complete marketing project tracker with campaign timelines, budget allocation, and ROI tracking',
    format: 'XLSX',
    downloads: 3456,
    size: '310 KB',
    downloadUrl: '/templates/excel/Marketing-Project-Management-Template.xlsx',
    featured: false,
    dateAdded: '2024-10-20',
    tags: ['marketing', 'project', 'management']
  },
  {
    id: 'xls-004',
    name: 'Household Monthly Budget',
    category: 'excel',
    description: 'Simple monthly budget spreadsheet for household expense tracking and financial planning',
    format: 'XLSX',
    downloads: 6789,
    size: '354 KB',
    downloadUrl: '/templates/excel/Simple-Household-Monthly-Budget-Spreadsheet-Template.xlsx',
    featured: false,
    dateAdded: '2024-11-10',
    tags: ['budget', 'household', 'monthly']
  },
  {
    id: 'xls-005',
    name: 'HR Calendar',
    category: 'excel',
    description: 'Blank HR calendar template for employee schedules, holidays, and leave management',
    format: 'XLSX',
    downloads: 2341,
    size: '18 KB',
    downloadUrl: '/templates/excel/Blank-HR-Calendar-Template.xlsx',
    featured: false,
    dateAdded: '2024-10-05',
    tags: ['hr', 'calendar', 'schedule']
  },
  {
    id: 'xls-006',
    name: 'Task Timeline',
    category: 'excel',
    description: 'Visual task timeline with Gantt chart functionality for comprehensive project planning',
    format: 'XLSX',
    downloads: 4567,
    size: '28 KB',
    downloadUrl: '/templates/excel/Task-Timeline-Template.xlsx',
    featured: true,
    dateAdded: '2024-11-18',
    tags: ['timeline', 'gantt', 'project']
  },
  {
    id: 'xls-007',
    name: 'Career Roadmap Overview',
    category: 'excel',
    description: 'Strategic career planning template with goals, milestones, skills tracking, and achievements',
    format: 'XLSX',
    downloads: 3890,
    size: '36 KB',
    downloadUrl: '/templates/excel/Career-Roadmap-Overview-Template.xlsx',
    featured: false,
    dateAdded: '2024-10-15',
    tags: ['career', 'planning', 'professional']
  },
  {
    id: 'xls-008',
    name: 'Bill Template',
    category: 'excel',
    description: 'Simple bill template for service invoicing, payment tracking, and client billing',
    format: 'XLSX',
    downloads: 5123,
    size: '11 KB',
    downloadUrl: '/templates/excel/Bill-Template.xlsx',
    featured: false,
    dateAdded: '2024-11-05',
    tags: ['bill', 'invoice', 'payment']
  },
  {
    id: 'xls-009',
    name: 'Hybrid Work Schedule',
    category: 'excel',
    description: 'Manage hybrid work schedules with remote days, office days, and team coordination',
    format: 'XLSX',
    downloads: 4234,
    size: '12 KB',
    downloadUrl: '/templates/excel/Hybrid-Work-Schedule.xlsx',
    featured: false,
    dateAdded: '2024-11-12',
    tags: ['schedule', 'hybrid', 'work']
  },
  {
    id: 'xls-010',
    name: 'Packing Slip',
    category: 'excel',
    description: 'Professional packing slip template for shipping, inventory management, and order tracking',
    format: 'XLSX',
    downloads: 2890,
    size: '75 KB',
    downloadUrl: '/templates/excel/Packing-Slip-Template.xlsx',
    featured: false,
    dateAdded: '2024-10-25',
    tags: ['shipping', 'inventory', 'logistics']
  },
  {
    id: 'xls-011',
    name: 'Meeting Minutes',
    category: 'excel',
    description: 'Document meeting notes, action items, decisions, and follow-up tasks professionally',
    format: 'XLSX',
    downloads: 6234,
    size: '435 KB',
    downloadUrl: '/templates/excel/Meeting-Minutes-Template.xlsx',
    featured: true,
    dateAdded: '2024-11-20',
    tags: ['meeting', 'notes', 'documentation']
  },
  {
    id: 'xls-012',
    name: 'Induction Plan',
    category: 'excel',
    description: 'Employee onboarding and induction checklist with training milestones and goals',
    format: 'XLSX',
    downloads: 1890,
    size: '34 KB',
    downloadUrl: '/templates/excel/Induction-Plan-Template.xlsx',
    featured: false,
    dateAdded: '2024-10-10',
    tags: ['onboarding', 'hr', 'training']
  },

  // ========== POWERPOINT TEMPLATES ==========
  {
    id: 'ppt-001',
    name: 'Giant Doodles Newsletter',
    category: 'powerpoint',
    description: 'Creative doodle-style newsletter presentation with engaging visual elements and layouts',
    format: 'PPTX',
    downloads: 4567,
    size: '10.2 MB',
    downloadUrl: '/templates/powerpoint/Giant Doodles Newsletter XL by Slidesgo.pptx',
    featured: true,
    dateAdded: '2024-11-08',
    tags: ['newsletter', 'creative', 'doodles']
  },
  {
    id: 'ppt-002',
    name: 'Wizard Workshop',
    category: 'powerpoint',
    description: 'Fun wizard-themed workshop presentation for training sessions and educational content',
    format: 'PPTX',
    downloads: 3234,
    size: '8.4 MB',
    downloadUrl: '/templates/powerpoint/How To Be a Great Wizard Workshop by Slidesgo.pptx',
    featured: false,
    dateAdded: '2024-10-28',
    tags: ['workshop', 'training', 'education']
  },
  {
    id: 'ppt-003',
    name: 'Creative Retrospective Meeting',
    category: 'powerpoint',
    description: 'Colorful retrospective meeting template for agile teams and sprint reviews',
    format: 'PPTX',
    downloads: 5890,
    size: '20.5 MB',
    downloadUrl: '/templates/powerpoint/Creative Retrospective Meeting XL by Slidesgo.pptx',
    featured: true,
    dateAdded: '2024-11-22',
    tags: ['agile', 'retrospective', 'meeting']
  },
  {
    id: 'ppt-004',
    name: 'Watercolor College Project',
    category: 'powerpoint',
    description: 'Beautiful watercolor design perfect for college presentations and academic projects',
    format: 'PPTX',
    downloads: 4123,
    size: '12.2 MB',
    downloadUrl: '/templates/powerpoint/Watercolor College Project XL by Slidesgo.pptx',
    featured: true,
    dateAdded: '2024-11-16',
    tags: ['college', 'academic', 'watercolor']
  },
  {
    id: 'ppt-005',
    name: 'Us Among Them',
    category: 'powerpoint',
    description: 'Modern presentation design with abstract theme and professional layouts',
    format: 'PPTX',
    downloads: 3678,
    size: '9.2 MB',
    downloadUrl: '/templates/powerpoint/Us Among Them! _ by Slidesgo.pptx',
    featured: false,
    dateAdded: '2024-10-18',
    tags: ['modern', 'abstract', 'professional']
  },
  {
    id: 'ppt-006',
    name: 'Spaceship Videocall Backgrounds',
    category: 'powerpoint',
    description: 'Futuristic spaceship backgrounds perfect for virtual meetings and online presentations',
    format: 'PPTX',
    downloads: 7890,
    size: '6.5 MB',
    downloadUrl: '/templates/powerpoint/Inside of a Spaceship_ Videocall Backgrounds by Slidesgo.pptx',
    featured: true,
    dateAdded: '2024-11-25',
    tags: ['videocall', 'background', 'futuristic']
  },
  {
    id: 'ppt-007',
    name: 'Generation of 27',
    category: 'powerpoint',
    description: 'Contemporary presentation design for modern business and creative projects',
    format: 'PPTX',
    downloads: 2456,
    size: '11.8 MB',
    downloadUrl: '/templates/powerpoint/Generation of \'27 XL by Slidesgo.pptx',
    featured: false,
    dateAdded: '2024-10-22',
    tags: ['modern', 'business', 'contemporary']
  },
  {
    id: 'ppt-008',
    name: 'Our Creative Company',
    category: 'powerpoint',
    description: 'Professional company presentation template with portfolio and team sections',
    format: 'PPTX',
    downloads: 5234,
    size: '14.3 MB',
    downloadUrl: '/templates/powerpoint/Our Creative Company XL by Slidesgo.pptx',
    featured: false,
    dateAdded: '2024-11-02',
    tags: ['company', 'portfolio', 'business']
  }
];

// ==================== MAIN COMPONENT ====================

const Templators = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'excel' | 'powerpoint'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'popular' | 'name' | 'recent'>('popular');

  // Filter and sort templates
  const filteredTemplates = useMemo(() => {
    return TEMPLATES
      .filter(template => {
        const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
        const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             template.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'popular') return b.downloads - a.downloads;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        if (sortBy === 'recent') return new Date(b.dateAdded || 0).getTime() - new Date(a.dateAdded || 0).getTime();
        return 0;
      });
  }, [selectedCategory, searchQuery, sortBy]);

  const featuredTemplates = useMemo(() => {
    return TEMPLATES.filter(t => t.featured).slice(0, 4);
  }, []);

  const handleDownload = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalDownloads = TEMPLATES.reduce((sum, t) => sum + t.downloads, 0);
  const excelCount = TEMPLATES.filter(t => t.category === 'excel').length;
  const powerPointCount = TEMPLATES.filter(t => t.category === 'powerpoint').length;

  return (
    <div className="templators-page">
      {/* Hero Section with Video Background */}
      <section className="templators-hero">
        <div className="hero-video-container">
          <video autoPlay loop muted playsInline className="hero-video">
            <source src="/Templator.mp4" type="video/mp4" />
          </video>
          <div className="hero-overlay" />
        </div>
        
        <div className="hero-content">
          <Badge className="hero-badge" variant="outline">
            <Star className="w-4 h-4 mr-1" />
            Professional Templates Library
          </Badge>
          <h1 className="hero-title">
            Free Excel & PowerPoint Templates
          </h1>
          <p className="hero-description">
            Download professionally designed templates for your projects. 
            Boost productivity with ready-to-use Excel spreadsheets and PowerPoint presentations.
          </p>
          
          <div className="hero-stats">
            <div className="stat-card">
              <TrendingUp className="stat-icon" />
              <div className="stat-content">
                <div className="stat-number">{TEMPLATES.length}</div>
                <div className="stat-label">Templates</div>
              </div>
            </div>
            <div className="stat-card">
              <Download className="stat-icon" />
              <div className="stat-content">
                <div className="stat-number">{totalDownloads.toLocaleString()}</div>
                <div className="stat-label">Downloads</div>
              </div>
            </div>
            <div className="stat-card">
              <Star className="stat-icon" />
              <div className="stat-content">
                <div className="stat-number">100%</div>
                <div className="stat-label">Free</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Templates */}
      <section className="featured-section">
        <div className="section-header">
          <h2 className="section-title">Featured Templates</h2>
          <p className="section-description">Our most popular and highly-rated templates</p>
        </div>
        
        <div className="featured-grid">
          {featuredTemplates.map(template => (
            <Card key={template.id} className="featured-card">
              <CardHeader>
                <div className="featured-icon">
                  {template.category === 'excel' ? (
                    <FileSpreadsheet className="w-12 h-12" />
                  ) : (
                    <Presentation className="w-12 h-12" />
                  )}
                </div>
                <Badge className="featured-badge">Featured</Badge>
              </CardHeader>
              <CardContent>
                <CardTitle className="template-name">{template.name}</CardTitle>
                <CardDescription className="template-desc">{template.description}</CardDescription>
                <div className="template-meta">
                  <Badge variant="secondary">{template.format}</Badge>
                  <span className="downloads-count">⬇️ {template.downloads.toLocaleString()}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="download-button"
                  onClick={() => handleDownload(template.downloadUrl, `${template.name}.${template.format.toLowerCase()}`)}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Free
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Main Templates Section */}
      <section className="templates-section">
        <div className="templates-header">
          <h2 className="section-title">Browse All Templates</h2>
          
          {/* Search and Filter Toolbar */}
          <div className="toolbar">
            <div className="search-bar">
              <Search className="search-icon" />
              <Input
                type="text"
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
            
            <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
              <SelectTrigger className="sort-select">
                <ArrowUpDown className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="name">Name (A-Z)</SelectItem>
                <SelectItem value="recent">Recently Added</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={(value: any) => setSelectedCategory(value)} className="category-tabs">
          <TabsList className="tabs-list">
            <TabsTrigger value="all" className="tab-trigger">
              All Templates ({TEMPLATES.length})
            </TabsTrigger>
            <TabsTrigger value="excel" className="tab-trigger">
              <FileSpreadsheet className="w-4 h-4 mr-2" />
              Excel ({excelCount})
            </TabsTrigger>
            <TabsTrigger value="powerpoint" className="tab-trigger">
              <Presentation className="w-4 h-4 mr-2" />
              PowerPoint ({powerPointCount})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={selectedCategory} className="templates-grid">
            {filteredTemplates.length === 0 ? (
              <div className="no-results">
                <p>No templates found</p>
                <small>Try adjusting your search or filters</small>
              </div>
            ) : (
              filteredTemplates.map(template => (
                <Card key={template.id} className="template-card">
                  <CardHeader className="template-header">
                    <div className="template-icon-wrapper">
                      {template.category === 'excel' ? (
                        <FileSpreadsheet className="template-icon excel" />
                      ) : (
                        <Presentation className="template-icon powerpoint" />
                      )}
                    </div>
                    <Badge className="format-badge">{template.format}</Badge>
                  </CardHeader>
                  
                  <CardContent className="template-content">
                    <CardTitle className="template-title">{template.name}</CardTitle>
                    <CardDescription className="template-description">
                      {template.description}
                    </CardDescription>
                    
                    <div className="template-tags">
                      {template.tags?.slice(0, 3).map(tag => (
                        <Badge key={tag} variant="outline" className="tag-badge">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="template-info">
                      <span className="info-item">📦 {template.size}</span>
                      <span className="info-item">⬇️ {template.downloads.toLocaleString()}</span>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="template-footer">
                    <Button 
                      className="download-btn"
                      onClick={() => handleDownload(template.downloadUrl, `${template.name}.${template.format.toLowerCase()}`)}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </CardFooter>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </section>

      {/* Footer Stats */}
      <section className="footer-stats">
        <p>Showing {filteredTemplates.length} of {TEMPLATES.length} templates · All templates are 100% free to download and use</p>
      </section>
    </div>
  );
};

export default Templators;
