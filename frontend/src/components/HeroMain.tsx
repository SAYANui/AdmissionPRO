import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowDown } from "lucide-react";

const HeroMain = () => {
  return (
    <main className="container mx-auto min-h-max flex flex-col items-center justify-center text-center py-20 px-8">
      <h1 className="text-4xl font-extrabold mb-4">Welcome to Admission<span className="text-primary">PRO</span></h1>
      <p className="text-lg mb-6 text-gray-600 dark:text-gray-300">Your one-stop solution for schools, colleges and institutes admission portal.</p>
      <div className="flex space-x-4">
        <Button variant="default">Get Started <ArrowRight className="ml-2 w-4 h-4" /></Button>
        <Button variant="outline">Learn More <ArrowDown className="ml-2 w-4 h-4" /></Button>
      </div>
    </main>
  );
}

export default HeroMain;
