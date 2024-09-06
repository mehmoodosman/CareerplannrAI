// import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
// import {
//   JSONLoader,
//   JSONLinesLoader,
// } from "langchain/document_loaders/fs/json";
// import { TextLoader } from "langchain/document_loaders/fs/text";
// import { CSVLoader } from "langchain/document_loaders/fs/csv";

import { NextResponse } from "next/server";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

export async function POST(req) {
    try {
      // Parse the incoming FormData request body to get the file
      const data = await req.formData();
      const file = data.get('file');

      if (!file) {
        throw new Error('No file provided');
      }

      // Load the PDF using PDFLoader (assuming it can work with the saved file)
      const loader = new PDFLoader(file);
      const docs = await loader.load();

      console.log('PDF loaded successfully with length...', docs.length);



      return NextResponse.json(docs, { status: 200 });

    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json({ error: 'Failed to search URL.' }, { status: 500 });
    }
}







/* Start ================================================================================================================= 
    Add this function to the request handler (client side)
-----------------------------------------------------------------

const [filepath, setFilepath] = useState('app/api/loader/YasinEhsan.pdf');  // Replace this with the path of the file

const loadPDF = async () => {
      try{
        const response = await fetch(`/api/loader`, {
          method: "POST",
          body: JSON.stringify({ 
            filepath: filepath }),
        })

        // Check if the response is okay
        if (!response.ok) {
          throw new Error(`Error fetching file`);
        }

        // Return a Document object from the response
        // Document = [{pageContent: "contents of the resume",
        //   metadata: {loc: {}, pdf: {}, source: "YasinEhsan.pdf", pageNumber: 1} }]
        const data = await response.json();
        console.log("data: ", data);
        return data;
      
      } catch(error) {
        console.error('Error fetching files:', error);
        return;
      }
    }

/* End ================================================================================================================= */