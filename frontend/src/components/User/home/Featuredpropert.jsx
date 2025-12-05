import React, { useState, useRef, useEffect } from 'react';
import { FiMapPin } from 'react-icons/fi';

// Placeholder data for properties. Replace with your actual data.
const propertiesData = [
	{
		id: 1,
		imageSrc:
			'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80',
		tag: 'Flat',
		name: 'Ranka Ankura',
		builder: 'by Renka International Pvt Ltd',
		price: '₹30k',
		period: '/Month',
		location: 'Thanisandra, Bangalore',
		bhk: '2&3BHK',
		
	},
	{
		id: 2,
		imageSrc:
			'https://images.unsplash.com/photo-1464146072230-91cabc968266?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170',
		tag: 'Flat',
		name: 'Ranka Ankura',
		builder: 'by Renka International Pvt Ltd',
		price: '₹30k',
		period: '/Month',
		location: 'Thanisandra, Bangalore',
		bhk: '2&3BHK',
	},
	{
		id: 3,
		imageSrc:
			'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
		tag: 'Flat',
		name: 'Ranka Ankura',
		builder: 'by Renka International Pvt Ltd',
		price: '₹30k',
		period: '/Month',
		location: 'Thanisandra, Bangalore',
		bhk: '2&3BHK',
	},
	{
		id: 4,
		imageSrc:
			'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
		tag: 'Flat',
		name: 'Ranka Ankura',
		builder: 'by Renka International Pvt Ltd',
		price: '₹30k',
		period: '/Month',
		location: 'Thanisandra, Bangalore',
		bhk: '2&3BHK',
	},
	{
		id: 5,
		imageSrc:
			'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
		tag: 'Flat',
		name: 'Ranka Ankura',
		builder: 'by Renka International Pvt Ltd',
		price: '₹30k',
		period: '/Month',
		location: 'Thanisandra, Bangalore',
		bhk: '2&3BHK',
	},
	{
		id: 6,
		imageSrc:
			'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
		tag: 'Flat',
		name: 'Ranka Ankura',
		builder: 'by Renka International Pvt Ltd',
		price: '₹30k',
		period: '/Month',
		location: 'Thanisandra, Bangalore',
		bhk: '2&3BHK',
	},
];

const tabs = ['Flats', 'Plots', 'Shops/Offices', 'Commercials'];

// const dottedLine = () => (
// 	<svg
// 		xmlns="http://www.w3.org/2000/svg"
// 		width="1440"
// 		height="1263"
// 		viewBox="0 0 1440 1263"
// 		fill="none"
// 		className="absolute left-1/2 -translate-x-1/2  top-0 w-full h-auto pointer-events-none z-0"
// 		style={{ maxWidth: '1440px' }}
// 	>
// 		<path
// 			opacity="0.2"
// 			d="M1513.53 1261.2C1496.94 1207.78 1403.05 1123.1 1298.6 1052.93C1194.14 982.763 1080.26 924.414 970.38 870.877C860.5 817.339 749.941 765.979 640.057 702.878C530.173 639.778 418.098 561.395 355.481 490.978C312.426 442.541 293.207 398.866 231.567 347.972C175.785 301.926 101.288 263.246 32.5091 226.429C-36.2695 189.611 -113.309 144.898 -156.613 100.129C-200.566 54.6758 -191.722 25.2925 -152.148 22.8258C-112.574 20.3591 -48.9515 39.4064 15.1139 62.1212C79.1792 84.8359 146.482 111.747 205.185 127.494C263.888 143.241 314.503 146.371 322.178 122.128C329.854 97.8851 281.158 40.6173 211.552 1.70115"
// 			stroke="white"
// 			strokeWidth="2"
// 			strokeMiterlimit="10"
// 			strokeLinecap="round"
// 			strokeDasharray="6.3 11.82"
// 		/>
// 	</svg>
// );

const Featuredpropert = () => {
	const [activeTab, setActiveTab] = useState('Flats');
	const [currentScrollIndex, setCurrentScrollIndex] = useState(0);
	const scrollContainerRef = useRef(null);
	
	// Calculate total number of scroll positions
	const totalScrollPositions = propertiesData.length;
	
	// Handle scroll to specific position
	const scrollToPosition = (index) => {
		if (scrollContainerRef.current) {
			const container = scrollContainerRef.current;
			const cardWidth = 320; // w-80 = 320px
			const scrollPosition = index * cardWidth;
			
			container.scrollTo({
				left: scrollPosition,
				behavior: 'smooth'
			});
		}
	};
	
	// Handle scroll event to update current position
	const handleScroll = () => {
		if (scrollContainerRef.current) {
			const container = scrollContainerRef.current;
			const scrollLeft = container.scrollLeft;
			const cardWidth = 320; // w-80 = 320px
			const newIndex = Math.round(scrollLeft / cardWidth);
			setCurrentScrollIndex(Math.min(newIndex, totalScrollPositions - 1));
		}
	};
	
	// Add scroll event listener
	useEffect(() => {
		const container = scrollContainerRef.current;
		if (container) {
			container.addEventListener('scroll', handleScroll);
			return () => container.removeEventListener('scroll', handleScroll);
		}
	}, []);

	return (
		<div className="bg-[#10437e] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 font-sans rounded-4xl relative overflow-hidden">
			{/* Dotted SVG Background */}
			{/* {dottedLine()} */}
			<div className="relative z-10 max-w-7xl mx-auto">
				{/* Section Header */}
				<div className="text-center mb-8 sm:mb-12">
					<h2 className="text-2xl sm:text-3xl lg:text-[2.4vw] font-bold text-white">
						Featured Properties
					</h2>
					<p className="mt-3 sm:mt-4 max-w-2xl mx-auto text-sm sm:text-[.9vw] text-gray-300 px-4">
						From luxurious city apartments to peaceful countryside retreats,
						explore our featured properties designed to match your lifestyle, meet
						your dreams, and offer comfort and quality.
					</p>
				</div>

				{/* Category Tabs - Responsive with horizontal scroll */}
				<div className="flex  justify-center mb-8 sm:mb-12">
					<div className="w-[95vw] md:max-w-md">
						<div className="bg-white rounded-full p-1 flex shadow-md ">
							<div className="flex space-x-1 min-w-max px-2">
								{tabs.map((tab) => (
									<button
										key={tab}
										onClick={() => setActiveTab(tab)}
										className={`px-3 md:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-300 whitespace-nowrap flex-shrink-0 ${
											activeTab === tab
												? 'bg-pink-600 text-white shadow-md'
												: 'text-gray-700 hover:bg-pink-100'
										}`}
									>
										{tab}
									</button>
								))}
							</div>
						</div>
					</div>
				</div>

				{/* Properties Grid - Responsive with scrollable cards and dots */}
				<div className="relative">
					{/* Desktop Grid */}
					<div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 xl:gap-10">
						{propertiesData.map((property) => (
							<div
								key={property.id}
								className="bg-blue-800/30 p-2 rounded-2xl group "
							>
								<div className="bg-white rounded-xl overflow-hidden shadow-lg w-full">
									<div className="relative">
										<img loading='lazy'
											className="w-full h-48 sm:h-56 object-cover"
											src={property.imageSrc}
											alt={property.name}
										/>
										<div className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-gray-100/80 backdrop-blur-sm text-gray-800 text-xs font-semibold px-2 sm:px-3 py-1 rounded-full">
											{property.tag}
										</div>
									</div>
									<div className="p-4 sm:p-5">
										<div className="flex justify-between items-start">
											<div className="flex-1 min-w-0">
												<h3 className="text-lg sm:text-xl font-bold text-gray-900 truncate">
													{property.name}
												</h3>
												<p className="text-xs text-gray-500 mt-1 truncate">
													{property.builder}
												</p>
											</div>
											<p className="text-lg sm:text-xl font-bold text-pink-600 ml-2 flex-shrink-0">
												{property.price}
												<span className="text-xs sm:text-sm font-medium text-gray-500">
													{property.period}
												</span>
											</p>
										</div>
										<div className="border-t border-gray-200 mt-3 sm:mt-4 pt-3 sm:pt-4 flex justify-between items-center text-xs sm:text-sm">
											<div className="flex items-center text-gray-600 flex-1 min-w-0">
												<FiMapPin className="mr-1 sm:mr-2 text-pink-600 flex-shrink-0" />
												<span className="truncate">{property.location}</span>
											</div>
											<span className="bg-gray-200 text-gray-800 text-xs font-semibold px-2 sm:px-3 py-1 rounded-full ml-2 flex-shrink-0">
												{property.bhk}
											</span>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>

					{/* Mobile Scrollable Cards with Dots */}
					<div className="md:hidden ">
						{/* Scrollable Property Cards */}
						<div 
							ref={scrollContainerRef}
							className="flex space-x-4 overflow-x-auto pb-4 -mx-4 px-4"
							style={{ scrollBehavior: 'smooth',
								scrollbarColor: 'transparent transparent',
							 }}
							
						>
							{propertiesData.map((property) => (
								<div
									key={property.id}
									className="bg-blue-800/30 p-2 rounded-2xl group flex-shrink-0 w-80"
								>
									<div className="bg-white rounded-xl overflow-hidden shadow-lg w-full">
										<div className="relative">
											<img loading='lazy'
												className="w-full h-48 object-cover"
												src={property.imageSrc}
												alt={property.name}
											/>
											<div className="absolute top-3 left-3 bg-gray-100/80 backdrop-blur-sm text-gray-800 text-xs font-semibold px-2 py-1 rounded-full">
												{property.tag}
											</div>
										</div>
										<div className="p-4">
											<div className="flex justify-between items-start">
												<div className="flex-1 min-w-0">
													<h3 className="text-lg font-bold text-gray-900 truncate">
														{property.name}
													</h3>
													<p className="text-xs text-gray-500 mt-1 truncate">
														{property.builder}
													</p>
												</div>
												<p className="text-lg font-bold text-pink-600 ml-2 flex-shrink-0">
													{property.price}
													<span className="text-xs font-medium text-gray-500">
														{property.period}
													</span>
												</p>
											</div>
											<div className="border-t border-gray-200 mt-3 pt-3 flex justify-between items-center text-xs">
												<div className="flex items-center text-gray-600 flex-1 min-w-0">
													<FiMapPin className="mr-1 text-pink-600 flex-shrink-0" />
													<span className="truncate">{property.location}</span>
												</div>
												<span className="bg-gray-200 text-gray-800 text-xs font-semibold px-2 py-1 rounded-full ml-2 flex-shrink-0">
													{property.bhk}
												</span>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>

						{/* Navigation Dots */}
						{totalScrollPositions > 1 && (
							<div className="flex justify-center items-center space-x-2 mt-4">
								{Array.from({ length: totalScrollPositions }, (_, index) => (
									<button
										key={index}
										onClick={() => scrollToPosition(index)}
										className={`w-3 h-3 rounded-full transition-all duration-300 ${
											currentScrollIndex === index
												? 'bg-pink-600 scale-110'
												: 'bg-white/50 hover:bg-white/70'
										}`}
										aria-label={`Go to property ${index + 1}`}
									/>
								))}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Featuredpropert;