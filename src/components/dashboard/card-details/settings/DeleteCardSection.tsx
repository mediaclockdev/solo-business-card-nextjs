"use client";
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function DeleteCardSection() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-destructive">Delete Card</h3>
          <p className="text-sm text-muted-foreground">
            This action cannot be undone. This will permanently delete your card.
          </p>
          <Button variant="destructive" size="sm">
            Delete Card
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}