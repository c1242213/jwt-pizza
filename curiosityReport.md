# Curiosity Report Question:

## Grafana supports the Open Telemetry (OTel) standard for representing metric data. This is a commonly used standard for representing observability data. It is well worth taking the time to learn. 💡 You could even consider doing a curiosity report on the subject.

### - devops/instruction/grafanaMetrics/grafanaMetrics.md 

# What's OTel?:
##  According to elastic co, "OpenTelemetry (OTel) is an open-source observability framework that allows development teams to generate, process, and transmit telemetry data in a single, unified format". Its becoming a dominant observability standard in cloud native applications. It allows a user to modify and undersstand the performance of a distributed system. Tools like Grafana, Prometheus, and Jaeger, use Otel to reports things like metrics, logs, and traces for the user. 

# What's Otels History?
##  OpenTelemetry was developed from merging two observability projects: OpenTracing and OpenCensus. Cloud Native Computing Foundation (CNCF), launched OpenTracing in 2016, in order to distribute tracing to track requests across microservices. Google then intiated, IOpenCensus in 2018, which emphasized metrics and telemetry collection for a broader scope. 
##  Then finally in 2019, the CNCF merged OpenTracing and OpenCensus into OpenTelemetry for a greater central goal: to create a single standard for observability more usuable across platforms. The goal was to combine the strengths of both projects tracing from OpenTracing and metrics and logs from OpenCensus. Since ints creation OTel has grown rapidly, becoming one of the most active projects in the observability space, contributing to companies like Google and Microsoft. 

# How does Otel work?
##  The process begins with adding OTel to an application. Using OTel’s APIs developers insert lightweight code called instrumentation to capture telemetry data. For example, you might add a few lines to track pizza HTTP request latency or the pizza database query times. Once instrumented, the application generates telemetry data.Metrics record quantitative values, traces follow a request’s path across microservices, and logs capture event details. Next, the telemetry data is sent to the OTel Collector, a service that acts as a central hub. The Collector receives data via protocols like gRPC or HTTP, processes it and batches it for efficiency in order to be exported to observability tools. Finally, tools like Grafana receive the data and display it in dashboards. 

# Conclusion:
##  OpenTelemetry (OTel) has emerged as a transformative standard for observability. Its collection and analysis of metrics, traces, and logs to provide key insights into a distributed system. Building from OpenTracing and OpenCensus, OTel better solves critical challenges in the monitoring world. 