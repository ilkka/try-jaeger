# Jaeger distributed tracing Node.js example

This is an example of setting up Jaeger distributed tracing in a Node.js context. There are two source trees here: the root is a Next.js app that includes one page and one API route, the sources are in `/src`. The second part is an express API in `/quoteserver`, implementing a single API route `/quote` which returns a random quote after waiting some fraction of a second.

The whole thing can be started with `docker-compose up`, which runs both these apps and a Jaeger all-in-one container. After starting, the frontend can be accessed at <http://localhost:3000> and the Jaeger UI at <http://localhost:16686>. Reload the frontend a couple of times to generate some data into the UI.

The main idea here is to find out

- how Jaeger usage looks like in the first place, and
- how distributed tracing over process boundaries works.

The frontend makes a request to `/api/randomQuote` which is served by the Next.js backend. The backend route handler starts a Jaeger (actually Opentracing I guess) Span, logs an event, and calls the quoteserver API, passing the Span Context in the HTTP headers. Quoteserver extracts the Span Context from the headers in its request, starts its own child Span, then does some logging of its own.

The upshot of all of this is that this distributed flow is captured and displayed by Jaeger in a nice way, along with the events taking place along the way.
