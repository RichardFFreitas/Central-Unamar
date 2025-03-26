export function generateSlug(name: string) {
    return name
      .toLowerCase()
      .replace(/[\s\W-]+/g, "-") 
      .replace(/^-+|-+$/g, ""); 
  }