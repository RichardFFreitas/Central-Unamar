export const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-200 py-12">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:justify-center gap-8">
                    <div>
                        <h3 className="font-bold text-gray-900 mb-4">Central Unamar</h3>
                        <p className="text-gray-600 text-sm">
                        A lista de negócios de confiança em Unamar está aqui.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-900 mb-4">Links Rapidos</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="/about" className="text-gray-600 hover:text-primary text-sm">
                                    Sobre nós
                                </a>
                            </li>
                            <li>
                                <a href="/contact" className="text-gray-600 hover:text-primary text-sm">
                                    Contato
                                </a>
                            </li>
                            <li>
                                <a href="/businesses" className="text-gray-600 hover:text-primary text-sm">
                                    Todos os Comércios
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-200 text-center">
                    <p className="text-gray-600 text-sm">
                        © {new Date().getFullYear()} Central Unamar. Todos os direitos reservados.
                    </p>
                </div>
            </div>
        </footer>
    )

}