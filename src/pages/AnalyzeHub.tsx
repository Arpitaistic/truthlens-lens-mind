import { useState } from 'react';
import { FileText, Image, Mic, Video, Link2, Upload, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';

export default function AnalyzeHub() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [textContent, setTextContent] = useState('');
  const [urlContent, setUrlContent] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  
  const navigate = useNavigate();

  const handleAnalyze = async (type: string) => {
    setIsAnalyzing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsAnalyzing(false);
    
    // Navigate to results with mock data
    navigate('/report/sample', { 
      state: { 
        type,
        content: type === 'text' ? textContent : type === 'url' ? urlContent : 'Sample content',
      }
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
            Analyze Content
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Upload or input content across multiple formats for AI-powered verification
          </p>
        </div>

        <Card className="border border-border">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Content Analysis</CardTitle>
            <CardDescription>
              Choose your input method and let our AI analyze the credibility
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Tabs defaultValue="text" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="text" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Text
                </TabsTrigger>
                <TabsTrigger value="image" className="flex items-center gap-2">
                  <Image className="h-4 w-4" />
                  Image
                </TabsTrigger>
                <TabsTrigger value="voice" className="flex items-center gap-2">
                  <Mic className="h-4 w-4" />
                  Voice
                </TabsTrigger>
                <TabsTrigger value="video" className="flex items-center gap-2">
                  <Video className="h-4 w-4" />
                  Video
                </TabsTrigger>
                <TabsTrigger value="url" className="flex items-center gap-2">
                  <Link2 className="h-4 w-4" />
                  URL
                </TabsTrigger>
              </TabsList>

              <TabsContent value="text" className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Text Content</label>
                  <Textarea
                    placeholder="Paste the text content you want to analyze for misinformation..."
                    value={textContent}
                    onChange={(e) => setTextContent(e.target.value)}
                    className="min-h-32 resize-none"
                  />
                </div>
                <Button 
                  onClick={() => handleAnalyze('text')}
                  disabled={!textContent.trim() || isAnalyzing}
                  className="w-full bg-truth hover:bg-truth/90"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    'Analyze Text'
                  )}
                </Button>
              </TabsContent>

              <TabsContent value="image" className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Upload Image</label>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">
                      Drag and drop an image here, or click to select
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      id="image-upload"
                    />
                    <Button asChild variant="outline">
                      <label htmlFor="image-upload" className="cursor-pointer">
                        Choose Image
                      </label>
                    </Button>
                    {selectedFile && (
                      <p className="text-sm text-foreground mt-2">Selected: {selectedFile.name}</p>
                    )}
                  </div>
                </div>
                <Button 
                  onClick={() => handleAnalyze('image')}
                  disabled={!selectedFile || isAnalyzing}
                  className="w-full bg-truth hover:bg-truth/90"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    'Analyze Image'
                  )}
                </Button>
              </TabsContent>

              <TabsContent value="voice" className="space-y-4">
                <div className="space-y-4 text-center">
                  <div className="border border-border rounded-lg p-8">
                    <Mic className={`h-16 w-16 mx-auto mb-4 ${isRecording ? 'text-scam animate-pulse' : 'text-muted-foreground'}`} />
                    <p className="text-muted-foreground mb-4">
                      {isRecording ? 'Recording... Click to stop' : 'Click to start recording'}
                    </p>
                    <Button 
                      onClick={toggleRecording}
                      variant={isRecording ? "destructive" : "outline"}
                      size="lg"
                    >
                      {isRecording ? 'Stop Recording' : 'Start Recording'}
                    </Button>
                  </div>
                </div>
                <Button 
                  onClick={() => handleAnalyze('voice')}
                  disabled={isAnalyzing}
                  className="w-full bg-truth hover:bg-truth/90"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    'Analyze Voice'
                  )}
                </Button>
              </TabsContent>

              <TabsContent value="video" className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Upload Video</label>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    <Video className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">
                      Select a video file or provide a URL
                    </p>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleFileChange}
                      className="hidden"
                      id="video-upload"
                    />
                    <Button asChild variant="outline">
                      <label htmlFor="video-upload" className="cursor-pointer">
                        Choose Video
                      </label>
                    </Button>
                  </div>
                </div>
                <Button 
                  onClick={() => handleAnalyze('video')}
                  disabled={isAnalyzing}
                  className="w-full bg-truth hover:bg-truth/90"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    'Analyze Video'
                  )}
                </Button>
              </TabsContent>

              <TabsContent value="url" className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Website URL</label>
                  <Input
                    placeholder="https://example.com/article"
                    value={urlContent}
                    onChange={(e) => setUrlContent(e.target.value)}
                  />
                </div>
                <Button 
                  onClick={() => handleAnalyze('url')}
                  disabled={!urlContent.trim() || isAnalyzing}
                  className="w-full bg-truth hover:bg-truth/90"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    'Analyze URL'
                  )}
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}