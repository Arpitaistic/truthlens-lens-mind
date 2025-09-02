import { useParams, useLocation } from 'react-router-dom';
import { Shield, AlertTriangle, AlertCircle, CheckCircle, Share, Download, Bookmark, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import CredibilityDial from '@/components/CredibilityDial';

// Mock data for demonstration
const mockReports = {
  sample: {
    verdict: 'misleading',
    score: 15,
    content: 'Breaking: Scientists discover cure for all diseases using this one simple trick!',
    summary: 'This content contains multiple red flags typical of medical misinformation including exaggerated claims, clickbait language, and lack of credible sources.',
    eli5: 'This headline uses words like "simple trick" and makes impossible claims. Real scientific breakthroughs are shared through proper medical journals, not clickbait articles.',
    sources: [
      { name: 'Medical Journal Database', reputation: 'high', found: false },
      { name: 'WHO Official Statements', reputation: 'high', found: false },
      { name: 'Clickbait Pattern Database', reputation: 'medium', found: true }
    ],
    techniques: [
      { name: 'Clickbait Headlines', description: 'Uses sensational language to attract clicks', confidence: 95 },
      { name: 'False Authority', description: 'Claims scientific backing without evidence', confidence: 88 },
      { name: 'Too Good to be True', description: 'Makes unrealistic promises', confidence: 92 }
    ],
    similarities: [
      { content: 'Doctors hate this one weird trick...', similarity: 87 },
      { content: 'Scientists shocked by simple cure...', similarity: 79 },
      { content: 'This one trick cures everything...', similarity: 91 }
    ]
  }
};

export default function ReportViewer() {
  const { reportId } = useParams();
  const location = useLocation();
  
  const report = mockReports.sample; // In real app, fetch by reportId
  
  const getVerdictConfig = (verdict: string) => {
    switch (verdict) {
      case 'true':
        return {
          label: 'Verified True',
          icon: CheckCircle,
          bgColor: 'bg-safe',
          textColor: 'text-safe-foreground',
          borderColor: 'border-safe'
        };
      case 'misleading':
        return {
          label: 'Misleading',
          icon: AlertTriangle,
          bgColor: 'bg-scam',
          textColor: 'text-scam-foreground',
          borderColor: 'border-scam'
        };
      case 'unverified':
        return {
          label: 'Unverified',
          icon: AlertCircle,
          bgColor: 'bg-unverified',
          textColor: 'text-unverified-foreground',
          borderColor: 'border-unverified'
        };
      default:
        return {
          label: 'Needs Review',
          icon: Shield,
          bgColor: 'bg-muted',
          textColor: 'text-muted-foreground',
          borderColor: 'border-muted'
        };
    }
  };

  const verdictConfig = getVerdictConfig(report.verdict);
  const VerdictIcon = verdictConfig.icon;

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Report */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <Card className="border border-border">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-4">
                    <Badge className={`${verdictConfig.bgColor} ${verdictConfig.textColor} px-4 py-2`}>
                      <VerdictIcon className="h-4 w-4 mr-2" />
                      {verdictConfig.label}
                    </Badge>
                    <CardTitle className="text-xl font-semibold">Analysis Report</CardTitle>
                  </div>
                  <CredibilityDial score={report.score} size="md" />
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium text-foreground mb-2">Analyzed Content:</h3>
                  <p className="text-muted-foreground bg-surface-2 p-4 rounded-lg border border-border">
                    "{report.content}"
                  </p>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Share className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Button variant="outline" size="sm">
                    <Bookmark className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button variant="outline" size="sm">
                    <Volume2 className="h-4 w-4 mr-2" />
                    Listen
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Analysis */}
            <Card className="border border-border">
              <CardHeader>
                <CardTitle>Detailed Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="summary">
                    <AccordionTrigger>Summary & Assessment</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <p className="text-muted-foreground">{report.summary}</p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="eli5">
                    <AccordionTrigger>Explain Like I'm 12</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground">{report.eli5}</p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="sources">
                    <AccordionTrigger>Source Verification</AccordionTrigger>
                    <AccordionContent className="space-y-3">
                      {report.sources.map((source, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                          <div>
                            <p className="font-medium text-foreground">{source.name}</p>
                            <p className="text-sm text-muted-foreground">Reputation: {source.reputation}</p>
                          </div>
                          <Badge variant={source.found ? "destructive" : "secondary"}>
                            {source.found ? 'Found Match' : 'No Match'}
                          </Badge>
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="techniques">
                    <AccordionTrigger>Detected Techniques</AccordionTrigger>
                    <AccordionContent className="space-y-3">
                      {report.techniques.map((technique, index) => (
                        <div key={index} className="p-4 border border-border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-foreground">{technique.name}</h4>
                            <Badge variant="outline">{technique.confidence}%</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{technique.description}</p>
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="similarities">
                    <AccordionTrigger>Similar Scam Patterns</AccordionTrigger>
                    <AccordionContent className="space-y-3">
                      {report.similarities.map((similarity, index) => (
                        <div key={index} className="p-4 border border-border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-sm text-muted-foreground">"{similarity.content}"</p>
                            <Badge className="bg-scam text-scam-foreground">
                              {similarity.similarity}% match
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="border border-border">
              <CardHeader>
                <CardTitle className="text-lg">How to Verify Yourself</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-truth rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-muted-foreground">Check the original source and publication date</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-truth rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-muted-foreground">Look for quotes from verified experts</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-truth rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-muted-foreground">Cross-reference with reputable news sources</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-truth rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-muted-foreground">Be skeptical of sensational headlines</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-truth rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-muted-foreground">Check if other credible outlets report the same story</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border">
              <CardHeader>
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Analysis Type</span>
                  <span className="text-sm font-medium text-foreground">Text</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Processing Time</span>
                  <span className="text-sm font-medium text-foreground">2.3s</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Techniques Found</span>
                  <span className="text-sm font-medium text-foreground">{report.techniques.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Similar Patterns</span>
                  <span className="text-sm font-medium text-foreground">{report.similarities.length}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}