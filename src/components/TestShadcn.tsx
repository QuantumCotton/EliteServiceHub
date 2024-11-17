import React from 'react';
import { Button } from './ui/core/button';

export const TestShadcn: React.FC = () => {
  return (
    <div className="p-8 space-y-4">
      <h2 className="text-2xl font-bold mb-4">Shadcn Button Examples</h2>
      <div className="space-x-4">
        <Button>Default Button</Button>
        <Button variant="secondary">Secondary Button</Button>
        <Button variant="destructive">Destructive Button</Button>
      </div>
      <div className="space-x-4">
        <Button variant="outline">Outline Button</Button>
        <Button variant="ghost">Ghost Button</Button>
        <Button variant="link">Link Button</Button>
      </div>
      <div className="space-x-4">
        <Button size="sm">Small Button</Button>
        <Button size="default">Default Size</Button>
        <Button size="lg">Large Button</Button>
      </div>
    </div>
  );
};
