'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { RefreshCw } from 'lucide-react';

const defaultHtml = `<h1>Hello, World!</h1>
<p>This is a live preview of your code.</p>
<button onclick="showAlert()">Click Me</button>
`;

const defaultCss = `body {
  font-family: sans-serif;
  background-color: #f0f0f0;
  color: #333;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  text-align: center;
}

h1 {
  color: hsl(var(--primary));
}

button {
  background-color: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  opacity: 0.9;
}
`;

const defaultJs = `function showAlert() {
  alert('You clicked the button!');
}
`;

export function ProgrammingIDE() {
  const [htmlCode, setHtmlCode] = useState(defaultHtml);
  const [cssCode, setCssCode] = useState(defaultCss);
  const [jsCode, setJsCode] = useState(defaultJs);
  const [srcDoc, setSrcDoc] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <head>
            <style>${cssCode}</style>
          </head>
          <body>
            ${htmlCode}
            <script>${jsCode}</script>
          </body>
        </html>
      `);
    }, 250);

    return () => clearTimeout(timeout);
  }, [htmlCode, cssCode, jsCode]);

  const handleReset = () => {
    setHtmlCode(defaultHtml);
    setCssCode(defaultCss);
    setJsCode(defaultJs);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start h-[80vh]">
      <Card className="h-full flex flex-col">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Web Editor</CardTitle>
            <Button onClick={handleReset} variant="outline" size="sm">
              <RefreshCw className="h-4 w-4" /> <span className="ml-2">Reset</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col">
          <Tabs defaultValue="html" className="w-full flex-grow flex flex-col">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="html">HTML</TabsTrigger>
              <TabsTrigger value="css">CSS</TabsTrigger>
              <TabsTrigger value="js">JavaScript</TabsTrigger>
            </TabsList>
            <TabsContent value="html" className="flex-grow mt-2">
              <Textarea
                value={htmlCode}
                onChange={(e) => setHtmlCode(e.target.value)}
                className="font-code h-full text-sm resize-none"
                placeholder="Write your HTML here..."
              />
            </TabsContent>
            <TabsContent value="css" className="flex-grow mt-2">
              <Textarea
                value={cssCode}
                onChange={(e) => setCssCode(e.target.value)}
                className="font-code h-full text-sm resize-none"
                placeholder="Write your CSS here..."
              />
            </TabsContent>
            <TabsContent value="js" className="flex-grow mt-2">
               <Textarea
                value={jsCode}
                onChange={(e) => setJsCode(e.target.value)}
                className="font-code h-full text-sm resize-none"
                placeholder="Write your JavaScript here..."
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <Card className="h-full flex flex-col">
         <CardHeader>
            <CardTitle>Live Preview</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
            <iframe
                srcDoc={srcDoc}
                title="Live Preview"
                sandbox="allow-scripts"
                frameBorder="0"
                className="w-full h-full bg-white rounded-md border"
            />
        </CardContent>
      </Card>
    </div>
  );
}
