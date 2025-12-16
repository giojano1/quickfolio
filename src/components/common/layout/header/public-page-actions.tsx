import { Button } from "@/components/ui/button";
import { SquareArrowOutUpRight, Upload } from "lucide-react";

export default function PublicPageActions() {
  return (
    <div className="flex gap-4">
      <Button variant="outline">
        <SquareArrowOutUpRight />
        recriu.app/slug
      </Button>
      <Button>
        <Upload />
        Publish
      </Button>
    </div>
  );
}
