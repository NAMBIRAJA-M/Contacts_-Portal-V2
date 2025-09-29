// 📊 Overview.jsx — Main Section
import OverviewCard from "../Components/Sub Components/OverviewCard";

export default function Overview() {
  const data = [
    { id: 1, heading: "Total Contacts", value: 247, src: "/friends.png", description: "All contacts in your database", trend: "+12%", trendType: "positive" },
    { id: 2, heading: "New This Month", value: 23, src: "/date-of-birth.png", description: "Contacts added this month", trend: "+8%", trendType: "positive" },
    { id: 3, heading: "Active Contacts", value: 189, src: "/interface.png", description: "Engaged in last 30 days", trend: "+5%", trendType: "positive" },
    { id: 4, heading: "Birthdays This Month", value: 15, src: "/birthday-cake.png", description: "Upcoming celebrations", trend: "+3", trendType: "positive" },
  ]as const;

  return (
    <div className="w-full mt-2 ml-6 ">
      <div className="flex flex-wrap gap-8">
        {data.map((item) => (
          <OverviewCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}
