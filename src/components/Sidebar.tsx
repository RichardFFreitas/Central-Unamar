import React, { useEffect, useState } from "react";
import { useSupabase } from "@/hooks/useSupabase";

interface News {
	id: number,
	user_id: number,
	title: string,
	excerpt: string,
	content: string,
	category: string,
	image: string,
	created_at: string
}

export const Sidebar = () => {
	const { getNews } = useSupabase()
	const [ allNews, setAllnews ] = useState<News[]>([])

	useEffect(() => {
		const loadNews = async () => {
			const data = await getNews();

			setAllnews(data || []); // Armazena todos os negócios
		};
		loadNews();
	}, []);


	return (
		<div>
			<div className="w-[300px] bg-white rounded-lg shadow-lg p-6 space-y-6">
			<h2 className="font-semibold text-lg mb-4">Ultimas noticias de Unamar</h2>
					<section>
						<div className="space-y-4">
						{allNews.map((news) => (
							<article className="group" key={news.id}>
								<h3 className="font-medium transition-all">{news.title}</h3>
								<img src={news.image} className="rounded-md" />
								<p className="text-sm text-gray-600 mt-1">{news.excerpt}</p>
							</article>
						))}
						</div>
					</section>
				

					< div className="h-px bg-gray-200"></div>

			<section>
				<h2 className="font-semibold text-lg mb-4">Featured Businesses</h2>
				<div className="space-y-4">
					<article className="group flex items-center gap-4 p-2 rounded-lg hover:bg-gray-50 transition-all cursor-pointer">
						<div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
							<span className="material-symbols-outlined">store</span>
						</div>
						<div>
							<h3 className="font-medium group-hover:underline">Tech Solutions Inc</h3>
							<p className="text-sm text-gray-600">Innovation & Development</p>
						</div>
					</article>
					<article className="group flex items-center gap-4 p-2 rounded-lg hover:bg-gray-50 transition-all cursor-pointer">
						<div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
							<span className="material-symbols-outlined">eco</span>
						</div>
						<div>
							<h3 className="font-medium group-hover:underline">Green Energy Co</h3>
							<p className="text-sm text-gray-600">Renewable Energy</p>
						</div>
					</article>
				</div>
			</section>
		</div>
		</div >
	)
}

