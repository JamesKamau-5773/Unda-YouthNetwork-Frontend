import React from 'react';
import DashboardLayout from '../layout/DashboardLayout';
import DashboardCard from '@/components/ui/DashboardCard';
import { Link } from 'react-router-dom';
import { Calendar, Users } from 'lucide-react';

const ActionButton = ({ children, className = '', ...props }) => (
	<button
		className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-[#00C2CB] to-[#0090C0] shadow-lg shadow-[#00C2CB]/20 transition-transform hover:-translate-y-0.5 ${className}`}
		{...props}
	>
		{children}
	</button>
);

const MemberDashboard = () => {
	return (
		<DashboardLayout headerContent={(
			<div className="max-w-7xl mx-auto px-6">
								<div className="rounded-3xl bg-white p-6 md:px-8 md:py-4 shadow-[0_20px_50px_rgba(0,194,203,0.08)] border border-[#00C2CB]/10">
									<h2 className="text-lg md:text-xl font-extrabold tracking-tight text-[#0B1E3B]">Dashboard</h2>
									<p className="text-sm text-[#475569] mt-1">Your wellness snapshot and recent activity.</p>
								</div>
			</div>
		)}>

			<div className="grid grid-cols-12 gap-6">
				<div className="col-span-12 relative">
					<div className="px-6 py-12 md:py-20 lg:py-24 relative z-20">
						<div className="max-w-4xl">
							<h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white drop-shadow-lg">Welcome back, Champion</h1>
							<p className="mt-3 text-[#E0F2FE] text-lg drop-shadow">Here's your wellness snapshot and upcoming activities.</p>
							<div className="mt-6 flex items-center gap-3">
								<ActionButton>Start Check-In</ActionButton>
								<ActionButton className="bg-white text-[#0B1E3B] shadow-none border border-white/10">View Resources</ActionButton>
							</div>
						</div>

						{/* Streak / Points - glass style */}
												<div className="absolute right-6 top-6 md:top-10 z-20">
													<div className="bg-white/20 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 text-right">
															<div className="text-sm text-blue-200">Streak</div>
															<div className="text-white text-2xl font-extrabold">7 🔥</div>
															<div className="text-sm text-blue-200 mt-1">Points <span className="font-bold text-white">1,240</span></div>
														</div>
												</div>
					</div>
				</div>

				<div className="col-span-12 md:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-4 -mt-12">
					<DashboardCard className="min-h-[140px] flex items-start">
						<div>
							<div className="text-sm text-[#475569]">Sessions this month</div>
							<div className="text-[#0B1E3B] text-3xl font-bold mt-2">12</div>
						</div>
					</DashboardCard>

					<DashboardCard className="min-h-[140px] flex items-start">
						<div>
							<div className="text-sm text-[#475569]">Average mood</div>
							<div className="text-[#0B1E3B] text-3xl font-bold mt-2">Good 😊</div>
						</div>
					</DashboardCard>

					<DashboardCard className="min-h-[140px] flex items-start">
						<div>
							<div className="text-sm text-[#475569]">Active challenges</div>
							<div className="text-[#0B1E3B] text-3xl font-bold mt-2">3</div>
						</div>
					</DashboardCard>
				</div>

				<div className="col-span-12 md:col-span-4">
					<DashboardCard className="flex flex-col gap-4">
						<div className="flex items-center justify-between">
								<div>
								<div className="text-sm text-[#475569]">Upcoming Events</div>
								<div className="text-[#0B1E3B] font-bold">Next 7 days</div>
							</div>
							<Link to="/member/events" className="text-[#00C2CB] font-semibold">See all</Link>
						</div>

						<ul className="flex flex-col gap-3">
							<li className="flex items-start gap-3">
								<div className="p-2 rounded-lg bg-[#F0F7FF] text-[#0B1E3B]"><Calendar size={18} /></div>
								<div>
									<div className="text-[#0B1E3B] font-semibold">Peer Support Group</div>
									<div className="text-sm text-[#475569]">Tomorrow · 16:00</div>
								</div>
							</li>

							<li className="flex items-start gap-3">
								<div className="p-2 rounded-lg bg-[#F0F7FF] text-[#0B1E3B]"><Users size={18} /></div>
								<div>
									<div className="text-[#0B1E3B] font-semibold">Community Meetup</div>
									<div className="text-sm text-[#475569]">Fri · 18:00</div>
								</div>
							</li>
						</ul>

						<div className="mt-2">
							<ActionButton className="w-full justify-center">Add Event</ActionButton>
						</div>
					</DashboardCard>
				</div>
			</div>

		</DashboardLayout>
	);
};

export default MemberDashboard;
