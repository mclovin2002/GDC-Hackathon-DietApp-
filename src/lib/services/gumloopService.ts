import { toast } from '@/components/ui/use-toast';

declare global {
  interface Window {
    Gumloop: any;
  }
}

interface PipelineInput {
  name: string;
  value: any;
}

class GumloopService {
  private isInitialized: boolean = false;
  private apiKey: string = import.meta.env.VITE_GUMLOOP_API_KEY || '';

  async initialize() {
    if (this.isInitialized) return;
    this.isInitialized = true;
    console.log('Gumloop service initialized');
  }

  async startPipeline(userId: string, savedItemId: string, pipelineInputs: PipelineInput[] = []) {
    try {
      const response = await fetch(`https://api.gumloop.com/api/v1/start_pipeline`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          user_id: userId,
          saved_item_id: savedItemId,
          pipeline_inputs: pipelineInputs,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to start pipeline');
      }

      toast({
        title: "Pipeline Started",
        description: "Your request is being processed",
      });

      return data;
    } catch (error) {
      console.error('Pipeline Error:', error);
      toast({
        title: "Pipeline Error",
        description: error instanceof Error ? error.message : "Failed to start pipeline",
        variant: "destructive",
      });
      throw error;
    }
  }

  async checkPipelineStatus(pipelineId: string) {
    try {
      const response = await fetch(`https://api.gumloop.com/api/v1/pipeline_status/${pipelineId}`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to check pipeline status');
      }

      return data;
    } catch (error) {
      console.error('Pipeline Status Error:', error);
      throw error;
    }
  }
}

export const gumloopService = new GumloopService(); 