
import ContactBarChart from "./ContactsBarChart";
import ContactsPieChart from "./ContactsPieChart";

export default function Chart() {
  return (
    <div className="pr-2 -mt-[1rem">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ContactsPieChart />
        
        <ContactBarChart />
        
      </div>
    </div>
  );
}
