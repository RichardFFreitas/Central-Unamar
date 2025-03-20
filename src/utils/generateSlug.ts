export function generateSlug(name: string) {
    return name
      .toLowerCase()
      .replace(/[\s\W-]+/g, "-") // Substitui espaços e caracteres especiais por "-"
      .replace(/^-+|-+$/g, ""); // Remove traços extras no início/fim
  }