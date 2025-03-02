import { useRef, useEffect } from "react";

function PretalxWidget() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;

    // Make sure iframe is loaded
    if (iframe) {
      iframe.onload = function () {
        const interval = setInterval(() => {
          try {
            const iframeDoc = iframe.contentWindow?.document;
            const shadowHost = iframeDoc?.getElementById("schedule");

            // Access the shadow root
            const shadowRoot = shadowHost?.shadowRoot;

            if (shadowRoot) {
              // Now you can query within the shadow root
              const targetElement = shadowRoot.querySelectorAll(".settings");

              const links = shadowRoot.querySelectorAll('a');
              
              links.forEach(link => {
                link.setAttribute('target', '_blank');
              });

              if (targetElement) {
                if (targetElement.length > 0) {
                  clearInterval(interval);
                }
                targetElement.forEach((element: Element) => {
                  (element as HTMLElement).style.display = "none";
                });
              }
            }

            window.scrollTo(0, 0);
          } catch (error) {
            console.error("Error accessing iframe content:", error);
          }
        }, 100);
      };
    }
  }, []);

  const iframeContent = `

        <script type="text/javascript" src="https://talks.osgeo.org/foss4g-sotm-oceania-2023/schedule/widget/v2.en.js"></script>
        
        <pretalx-schedule id="schedule" event-url="https://talks.osgeo.org/foss4g-sotm-oceania-2023/" locale="en" format="grid" style="--pretalx-clr-primary: #3aa57c"></pretalx-schedule>
        
        <noscript>
            <div class="pretalx-widget">
                <div class="pretalx-widget-info-message">
                    JavaScript is disabled in your browser. To access our schedule without JavaScript,
                    please <a target="_blank" href="https://talks.osgeo.org/foss4g-sotm-oceania-2023/schedule/">click here</a>.
                </div>
            </div>
        </noscript>
    `;

  return (
    <iframe
      ref={iframeRef}
      title="Pretalx Schedule Widget"
      srcDoc={iframeContent}
      style={{ width: "100%", minHeight: "100vh" }}
      sandbox="allow-scripts allow-same-origin allow-popups"
    />
  );
}

export default PretalxWidget;
