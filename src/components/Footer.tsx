export const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-200 py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="font-bold text-gray-900 mb-4">Central Unamar</h3>
                        <p className="text-gray-600 text-sm">
                            Your trusted local business directory in Unamar.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-900 mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="/about" className="text-gray-600 hover:text-primary text-sm">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="/contact" className="text-gray-600 hover:text-primary text-sm">
                                    Contact
                                </a>
                            </li>
                            <li>
                                <a href="/businesses" className="text-gray-600 hover:text-primary text-sm">
                                    All Businesses
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-900 mb-4">Legal</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="/privacy" className="text-gray-600 hover:text-primary text-sm">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="/terms" className="text-gray-600 hover:text-primary text-sm">
                                    Terms of Service
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-900 mb-4">Connect</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-gray-600 hover:text-primary text-sm">
                                    Facebook
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-primary text-sm">
                                    Instagram
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-primary text-sm">
                                    Twitter
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-200 text-center">
                    <p className="text-gray-600 text-sm">
                        © {new Date().getFullYear()} Central Unamar. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )

}