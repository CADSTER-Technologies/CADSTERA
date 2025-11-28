import asyncio


async def is_unique_email(value):
    """Asynchronous Database Check for Unique Email"""
    await asyncio.sleep(0.1)  # Simulating DB lookup
    existing_emails = ["test@example.com", "admin@example.com"]
    if value in existing_emails:
        return "Email is already taken"
    return None