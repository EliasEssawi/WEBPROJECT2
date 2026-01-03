import React, { useState, useEffect } from "react";
import Sidebar from "../components/mainPage/Sidebar";
import Header from "../components/mainPage/Header";
import ProgressCard from "../components/mainPage/ProgressCard";
import RecentAchievement from "../components/mainPage/RecentAchievement";

const menuItems = [
  { name: "Talking", icon: "🗣️" },
  { name: "Reading", icon: "📖" },
  { name: "Listening", icon: "🎧" },
  { name: "Vocabulary", icon: "🔤" },
  { name: "AI Chat", icon: "🤖" },
];


export default function MainPage() {
  const cards = [
    { title: "Talking", level: 6, progress: 60, icon: "🗣️", url: "talking-practice.html" },
    { title: "Reading", level: 4, progress: 45, icon: "📖", url: "reading-practice.html" },
    { title: "Listening", level: 3, progress: 30, icon: "🎧", url: "listening-practice.html" },
    { title: "Vocabulary", level: 8, progress: 80, icon: "🔤", url: "vocabulary-practice.html" },
  ];

  return (
    <div className="bg-gray-100 h-screen w-full flex items-center justify-center p-4 overflow-hidden font-[Poppins]">
      <div className="flex w-full max-w-7xl h-[95vh] bg-white shadow-2xl rounded-3xl overflow-hidden border border-gray-200">
        <div className="flex">
            <Sidebar 
                menuItems={menuItems} 
                title={"Menu"}
                primaryAction={{ name: "View Progress", icon: "📊", url: "/progress" }}
                secondaryAction={{ name: "Profile", icon: "👤", url: "/profile" }}
                bottomAction={{ name: "Go to Shop", icon: "🛒", url: "/shop" }}
            />

            <main className="flex-1 p-8 md:p-12 overflow-y-auto flex flex-col gap-8">
            <Header 
                title = "Progrees 📊" 
                subtitle="Welcome back! You are doing great." 
                points={120}
                imgUrl="https://cdn-icons-png.flaticon.com/512/2922/2922510.png"
            />

            <section className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {cards.map((card) => (
                    <ProgressCard key={card.title} {...card} />
                ))}
            </section>

            <section>
                <h3 className="text-xl font-bold mb-4">Recent Achievements</h3>
                
                <RecentAchievement 
                    icon="🏆" 
                    title="7 Day Streak!" 
                    description="You practiced every day this week." 
                    color="blue-100"
                />
                <div className="mt-4">
                    <RecentAchievement 
                        icon="🔥" 
                        title="Word Master" 
                        description="You learned 50 new words." 
                        color="blue-100" />
                </div>
            </section>
            </main>
        </div>
      </div>
    </div>
  );
}
