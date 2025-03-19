import React, { useEffect, useState } from "react";
import { useSupabase } from "@/hooks/useSupabase";
import { Business } from "@/interfaces/Business";
import SearchBar from "./NewsSearchBar";
import { News } from "@/interfaces/News";


export const Sidebar = () => {
	const { getNews, getBusinesses } = useSupabase()
	const [allNews, setAllnews] = useState<News[]>([])
	const [businesses, setBusinesses] = useState<Business[]>([]);

	useEffect(() => {
		const loadData = async () => {
			const data = await getNews();
			setAllnews(data || []);

			const businessData = await getBusinesses();
			setBusinesses(businessData);
		};
		loadData();
	}, []);


	return (
		<div className="invisible xl:visible">
			<div className="w-[300px] bg-white rounded-lg shadow-lg p-6 space-y-6">
				<h2 className="font-semibold text-lg mb-4">Ultimas notícias de Unamar</h2>
				<section>
					<div className="space-y-4">
					<SearchBar />
						{allNews.length > 0 ? (
							allNews.map((news) => (
								<article className="group" key={news.id}>
									<h3 className="font-medium transition-all">{news.title}</h3>
									<img src={news.image} className="rounded-md" alt={news.title} />
									<p className="text-sm text-gray-600 mt-1">{news.excerpt}</p>
								</article>
							))
						) : (
							<p className="text-center text-gray-500">Nenhuma notícia no momento.</p>
						)}
					</div>
				</section>


				< div className="h-px bg-gray-200"></div>

				<section>
					<h2 className="font-semibold text-lg mb-4">Comércios em Destaque</h2>
					<div className="space-y-4">
						{businesses.length > 0 ? (
							businesses.map((business) => (
								<article className="group flex items-center gap-4 p-2 rounded-lg hover:bg-gray-50 transition-all cursor-pointer" key={business.id}>
									<div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
										<img className="w-12 h-12 object-cover rounded-full" src={business.photos[0]} alt={`logo da empresa ${business.name}`} />
									</div>
									<div>
										<h3 className="font-medium group-hover:underline">{business.name}</h3>
										<p className="text-sm text-gray-600">{business.category}</p>
									</div>
								</article>
							))
						) : (
							<p className="text-center text-gray-500">Nenhum negócio em destaque.</p>
						)}
					</div>
				</section>
			</div>
		</div >
	)
}

