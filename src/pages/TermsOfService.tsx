import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-3xl">
              <FileText className="h-6 w-6" />
              Terms of Service
            </CardTitle>
            <CardDescription>Last updated: [Date]</CardDescription>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none dark:prose-invert">
            <p>Terms of service content will be added here...</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TermsOfService;
