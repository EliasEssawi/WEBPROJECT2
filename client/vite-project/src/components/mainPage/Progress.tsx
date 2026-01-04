import ProgressCard from "./ProgressCard";
import RecentAchievement from "./RecentAchievement";
interface ProgreesProps {
  onSelectSection: (section: string) => void;
}

export default function Progrees({ onSelectSection }: ProgreesProps) {
    const cards = [
        { title: "Talking", level: 6, progress: 60, icon: "🗣️", url: "" },
        { title: "Reading", level: 4, progress: 45, icon: "📖", url: "" },
        { title: "Listening", level: 3, progress: 30, icon: "🎧", url: "" },
        { title: "Vocabulary", level: 8, progress: 80, icon: "🔤", url: "" },
    ];

    return (
        <div>
            <section className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {cards.map((card) => (
                    <ProgressCard 
                        key={card.title} 
                        {...card} 
                        onClick={() => onSelectSection(card.title)}
                    />
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
        </div>
    );
}
