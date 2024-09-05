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
        // Parse the incoming JSON request body
        const {filepath} = await req.json();
        console.log(`Processing request for path: ${filepath}`);

        const loader = new PDFLoader(filepath);

        const docs = await loader.load();
        console.log('PDF loaded successfully with length...', docs.length);

        return NextResponse.json(docs, { status: 200 })

    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json({ error: 'Failed to search URL.' }, { status: 500 });
    }
}







/* Start ================================================================================================================= 
    Add this function to the request handler (client side) and
-----------------------------------------------------------------

const [filepath, setFilepath] = useState('app/api/loader/YasinEhsan.pdf');  // Replase this with the filepath

const getFiles = async () => {
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