import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

const DocumentViewer = ({ fileUrl, onClose }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [pdfFallback, setPdfFallback] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  const transformForDownload = (url, filename) => {
    return url.includes("/upload/")
      ? url.replace("/upload/", `/upload/fl_attachment:${filename}/`)
      : url;
  };

  const getViewerComponent = () => {
    if (!fileUrl)
      return <div className="p-4 text-gray-500">No document available</div>;

    const url = new URL(fileUrl);
    const pathParts = url.pathname.split("/");
    const fileName = pathParts[pathParts.length - 1];
    const extension = fileName.includes(".")
      ? fileName.split(".").pop().toLowerCase()
      : "";

    const imageExtensions = ["jpg", "jpeg", "png", "gif", "webp", "svg"];
    const officeExtensions = ["doc", "docx", "xls", "xlsx", "ppt", "pptx"];
    const textExtensions = ["txt", "csv"];
    const codeExtensions = ["js", "jsx", "ts", "html", "css", "json"];

    if (imageExtensions.includes(extension)) {
      return (
        <img
          src={fileUrl}
          alt={fileName}
          className="max-w-full max-h-[80vh] mx-auto"
          onLoad={() => setLoading(false)}
        />
      );
    }

    if (extension === "pdf") {
      return !pdfFallback ? (
        <iframe
          src={fileUrl}
          className="w-full h-[80vh] border-0"
          title={fileName}
          onLoad={() => {
            setLoading(false);
          }}
          onError={() => {
            console.warn("PDF load failed. Switching to Google Docs fallback.");
            setPdfFallback(true);
            setLoading(false);
          }}
        />
      ) : (
        <iframe
          src={`https://docs.google.com/viewer?url=${encodeURIComponent(
            fileUrl
          )}&embedded=true`}
          className="w-full h-[80vh] border-0"
          title="Google Docs PDF Viewer"
          onLoad={() => setLoading(false)}
        />
      );
    }

    if (officeExtensions.includes(extension)) {
      return <OfficeViewer url={fileUrl} onLoad={() => setLoading(false)} />;
    }

    if (textExtensions.includes(extension)) {
      return <TextFileViewer url={fileUrl} onLoad={() => setLoading(false)} />;
    }

    if (codeExtensions.includes(extension)) {
      return (
        <CodeViewer
          url={fileUrl}
          language={extension}
          onLoad={() => setLoading(false)}
        />
      );
    }

    const downloadUrl = transformForDownload(fileUrl, fileName);
    return (
      <div className="flex flex-col items-center justify-center p-4">
        <p className="mb-4">
          {extension
            ? `Preview not available for .${extension} files`
            : "File type could not be determined"}
        </p>
        <a
          href={downloadUrl}
          download
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Download File
        </a>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-[90vw] max-h-[90vh] bg-white">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Document Viewer
          </DialogTitle>
        </DialogHeader>
        <div className="overflow-auto">
          {loading && (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          )}
          <div className={loading ? "hidden" : "block"}>
            {getViewerComponent()}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// --- Sub Components ---
const OfficeViewer = ({ url, onLoad }) => (
  <iframe
    src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
      url
    )}`}
    className="w-full h-[80vh] border-0"
    title="Office Document"
    onLoad={onLoad}
  />
);

const TextFileViewer = ({ url, onLoad }) => {
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch(url)
      .then((res) => res.text())
      .then((text) => {
        setContent(text);
        onLoad();
      })
      .catch(() => onLoad());
  }, [url]);

  return (
    <pre className="p-4 bg-gray-50 rounded-md overflow-auto max-h-[80vh]">
      {content || "Could not load text content"}
    </pre>
  );
};

const CodeViewer = ({ url, language, onLoad }) => {
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch(url)
      .then((res) => res.text())
      .then((text) => {
        setContent(text);
        onLoad();
      })
      .catch(() => onLoad());
  }, [url]);

  return (
    <div className="relative">
      <div className="absolute top-2 right-2 bg-gray-800 text-white px-2 py-1 rounded text-xs">
        {language}
      </div>
      <pre className="p-4 bg-gray-800 text-gray-100 rounded-md overflow-auto max-h-[80vh]">
        <code>{content || "Could not load code content"}</code>
      </pre>
    </div>
  );
};

export default DocumentViewer;
