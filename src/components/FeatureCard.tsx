import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  gradient?: "primary" | "secondary" | "accent";
  onClick?: () => void;
  className?: string;
}

export const FeatureCard = ({ 
  title, 
  description, 
  icon: Icon, 
  gradient = "primary",
  onClick,
  className 
}: FeatureCardProps) => {
  const gradientClasses = {
    primary: "bg-gradient-primary",
    secondary: "bg-gradient-secondary", 
    accent: "bg-gradient-hero"
  };

  return (
    <Card 
      className={cn(
        "group cursor-pointer transition-smooth hover:scale-105 hover:shadow-elegant",
        "border-border/50 backdrop-blur-sm bg-card/80",
        className
      )}
      onClick={onClick}
    >
      <CardHeader className="space-y-4">
        <div className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center",
          gradientClasses[gradient],
          "group-hover:shadow-glow transition-smooth"
        )}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <CardTitle className="text-lg font-semibold text-card-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-muted-foreground leading-relaxed">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
};