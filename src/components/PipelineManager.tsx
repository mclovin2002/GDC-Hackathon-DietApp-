import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { gumloopService } from '@/lib/services/gumloopService';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';

interface PipelineStatus {
  status: 'pending' | 'running' | 'completed' | 'failed';
  progress: number;
  message?: string;
}

export function PipelineManager() {
  const { user } = useAuth();
  const [pipelineId, setPipelineId] = useState<string | null>(null);
  const [status, setStatus] = useState<PipelineStatus>({
    status: 'pending',
    progress: 0
  });

  const startPipeline = async () => {
    if (!user) return;

    try {
      setStatus({ status: 'pending', progress: 0 });
      const result = await gumloopService.startPipeline(
        'tiOcQqnfWPcoaLBnevCgzUlQs9w2',  // Replace with actual user ID if different
        'gvfJF37sEPSNVh3sm1p1V9',        // Replace with actual saved item ID if different
        []                                // Add pipeline inputs if needed
      );
      setPipelineId(result.pipeline_id);
      setStatus({ status: 'running', progress: 0 });
    } catch (error) {
      setStatus({
        status: 'failed',
        progress: 0,
        message: error instanceof Error ? error.message : 'Failed to start pipeline'
      });
    }
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (pipelineId && status.status === 'running') {
      intervalId = setInterval(async () => {
        try {
          const pipelineStatus = await gumloopService.checkPipelineStatus(pipelineId);
          
          setStatus({
            status: pipelineStatus.status,
            progress: pipelineStatus.progress || 0,
            message: pipelineStatus.message
          });

          if (pipelineStatus.status === 'completed' || pipelineStatus.status === 'failed') {
            clearInterval(intervalId);
          }
        } catch (error) {
          console.error('Error checking pipeline status:', error);
        }
      }, 5000); // Check every 5 seconds
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [pipelineId, status.status]);

  const getStatusIcon = () => {
    switch (status.status) {
      case 'running':
        return <Loader2 className="h-6 w-6 animate-spin" />;
      case 'completed':
        return <CheckCircle2 className="h-6 w-6 text-green-500" />;
      case 'failed':
        return <XCircle className="h-6 w-6 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Pipeline Status
          {getStatusIcon()}
        </CardTitle>
        <CardDescription>
          Monitor your pipeline progress and status
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>{status.progress}%</span>
          </div>
          <Progress value={status.progress} />
        </div>

        {status.message && (
          <p className={`text-sm ${
            status.status === 'failed' ? 'text-red-500' : 'text-muted-foreground'
          }`}>
            {status.message}
          </p>
        )}

        <Button
          onClick={startPipeline}
          disabled={status.status === 'running'}
          className="w-full"
        >
          {status.status === 'running' ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            'Start Pipeline'
          )}
        </Button>
      </CardContent>
    </Card>
  );
} 