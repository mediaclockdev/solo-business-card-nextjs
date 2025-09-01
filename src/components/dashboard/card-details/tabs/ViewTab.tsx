"use client";
import { Card, CardContent } from '@/components/ui/card';
interface ViewTabProps {
  cardId: string;
}
export function ViewTab({
  cardId
}: ViewTabProps) {
  return <div className="space-y-4">
      <Card>
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <h3 className="text-lg font-semibold">Public View</h3>
            <p className="text-muted-foreground">View your card as the public would see it. 
Skip this page STEP and go directly to the public card view when the button is clicked</p>
            <button onClick={() => {
            const publicUrl = `/card/${cardId}`;
            window.open(publicUrl, '_blank');
          }} className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
              Open Public View
            </button>
          </div>
        </CardContent>
      </Card>
    </div>;
}