import { PipelineManager } from '@/components/PipelineManager';

export function PipelinePage() {
  return (
    <div className="container py-8 space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Pipeline Management</h1>
        <p className="text-muted-foreground">
          Start and monitor your data processing pipelines
        </p>
      </div>
      
      <PipelineManager />
    </div>
  );
} 