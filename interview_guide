import { useState } from "react";

const ROUNDS = [
  {
    id: "hr",
    label: "Round 1 - HR & Cultural Fit",
    color: "#2563eb",
    accent: "#dbeafe",
    icon: "👤",
    intro: "Albertsons is a large retail & grocery chain. They value reliability, cross-team collaboration, and a practical engineering mindset. Your 8+ years DevOps + Performance + 13-year prior career is a strong and unique story.",
    questions: [
      {
        q: "Tell me about yourself.",
        a: "I'm a Senior DevOps and Performance Engineer with over 8 years of focused IT experience, and about 21 years of total professional experience including my earlier career in electrical engineering and project management.\n\nOn the DevOps side, I specialize in CI/CD pipeline design, Kubernetes cluster management on EKS and GKE, Terraform-based infrastructure automation, and cloud platforms like AWS and GCP. Right now at ProfitApps, I am building Jenkins-based orchestration pipelines on GCP with dedicated build, promote, and deploy stages.\n\nOn the Performance Engineering side, I spent nearly four years at Cavisson Systems where I owned end-to-end performance testing: scripting load tests using NetStorm, designing workload models aligned to production traffic, conducting root cause analysis using APM tools like Dynatrace and AppDynamics, and delivering recommendations directly to development and DBA teams.\n\nWhat makes my background somewhat unique is the operational discipline I bring from my earlier career in managing high-stakes infrastructure projects. I apply that same structured, outcomes-first thinking to my engineering work today. I am particularly interested in Albertsons because of the scale of your retail infrastructure and the real-world performance demands that kind of environment creates."
      },
      {
        q: "Why Albertsons specifically?",
        a: "Albertsons operates at a scale that genuinely excites me: thousands of stores, high-frequency transactions, seasonal traffic surges during holidays and promotions. That is exactly the kind of environment where the work I have been doing in performance engineering, infrastructure reliability, and CI/CD automation directly moves the needle for the business.\n\nRetail is also one of the more performance-sensitive domains I have worked in. At Cavisson, a good portion of my engagements were with large e-commerce and enterprise platforms. I understand how even a few seconds of latency during peak checkout flows translates into real revenue loss, and I know how to identify and address those bottlenecks systematically.\n\nI am also drawn to teams that balance high reliability standards with continuous delivery, and from what I understand about Albertsons' engineering culture, that is a priority here. That aligns well with how I work."
      },
      {
        q: "What are your salary expectations?",
        a: "Based on my experience level, 8+ years in DevOps and Performance Engineering with hands-on expertise across Kubernetes, Terraform, CI/CD, and full-cycle performance testing, I am targeting a range in line with senior-level compensation for this role and location. I am open to discussing the full package including base, benefits, and growth opportunities. May I ask what the budgeted range for this position is?"
      },
      {
        q: "How do you handle pressure or tight deadlines?",
        a: "I learned a lot about handling pressure before I transitioned into IT. During my project management years in the energy sector, delays had real consequences: grid commissioning timelines, contractor coordination, regulatory deadlines. I got very good at triaging what matters most under pressure and communicating status clearly.\n\nIn my engineering roles, I apply the same principle. When we had a critical performance regression at Cavisson two days before a client's go-live, I stayed focused on isolating the bottleneck rather than reacting to the urgency. We used Dynatrace to trace it to a database query plan issue and got it resolved overnight. The key for me is staying methodical even when the environment is chaotic."
      },
      {
        q: "Are you open to on-call or after-hours production support?",
        a: "Yes, absolutely. Production reliability is not a nine-to-five responsibility. At Kloud9, I maintained 99.9% uptime across EKS and GKE production clusters. That kind of SLA does not hold without being responsive when incidents happen. I have participated in on-call rotations and I understand the expectations that come with owning infrastructure at this level."
      }
    ]
  },
  {
    id: "perf",
    label: "Round 2 - Performance Engineering (Deep Dive)",
    color: "#059669",
    accent: "#d1fae5",
    icon: "📊",
    intro: "This is your strongest area. Expect deep technical questions. Albertsons at scale means real retail traffic spikes: Black Friday, promotions, loyalty app surges. Tie every answer to business impact.",
    questions: [
      {
        q: "Walk me through how you design a performance test for a retail checkout flow.",
        a: "I start by working backwards from the business question: what does performance mean for this flow? For checkout it usually means response time under concurrent load, transaction success rate, and system stability under sustained traffic.\n\nStep one is production traffic analysis. I pull real data: transaction logs, APM traces, server metrics, to understand the actual distribution of user behavior. How many users are actively in checkout versus browsing? What is the think time between steps? What is the peak concurrent session count on a normal day versus a promotion day?\n\nStep two is workload model design. I model virtual users to match those profiles. At Cavisson I used NetStorm for this. I define the transaction mix, say 60% browsing, 25% add-to-cart, and 15% checkout, and configure pacing and think times to simulate realistic load rather than hammer-style requests.\n\nStep three is scripting. I capture the full checkout flow including authentication, cart operations, address selection, payment, and order confirmation. I parameterize credentials, product IDs, and payment tokens so each virtual user behaves independently.\n\nStep four is the execution strategy: start with a baseline at low load, ramp to peak, hold for endurance validation, and run a spike test to simulate flash sale conditions.\n\nFinally, I instrument the environment using APM tools, JVM metrics, and DB slow query logs so I can correlate response time degradation to a specific tier during analysis."
      },
      {
        q: "How do you identify a performance bottleneck? Give a real example.",
        a: "My approach is to start at the symptoms and work inward layer by layer.\n\nA concrete example from Cavisson: we were running a load test on an e-commerce platform at around 500 concurrent users, and checkout response times were spiking above 8 seconds at roughly 300 users. That was a clear SLA breach.\n\nFirst, I looked at the application tier using Dynatrace. The response time breakdown showed that roughly 70% of the time was being spent in database calls, not in the application logic.\n\nNext I drilled into the database tier. Dynatrace's SQL view showed one specific query, a product availability check, doing a full table scan on a 10 million row inventory table with no index on the filter column.\n\nI brought that finding, with trace data and query execution plans, to the DBA and development lead. They added a composite index in the same sprint. When we re-ran the test, checkout response time dropped from 8 seconds to under 1.2 seconds at 500 concurrent users.\n\nWhat matters is that you never guess. You follow the data, and you present findings in terms the receiving team can act on. A DBA needs a slow query with an execution plan. A developer needs a specific code path and flame graph. That is how you get fast fixes."
      },
      {
        q: "What is the difference between load, stress, endurance, and spike testing?",
        a: "These are four distinct test types, each answering a different question.\n\nLoad testing validates that the system meets SLA targets under the expected peak concurrent load. You define what peak means from production data and confirm the system handles it within agreed response time and error rate thresholds. I run this as the standard baseline for every release cycle.\n\nStress testing pushes beyond peak load to find the breaking point. The goal is to understand where and how the system fails: does it degrade gracefully or crash hard? At Cavisson, stress tests often revealed memory leaks and connection pool exhaustion that never appeared in load tests.\n\nEndurance or soak testing holds the system at sustained load, usually peak, for an extended period like four to eight hours. This catches slow degradation: memory leaks, connection pool leaks, and GC pressure that builds over time. A system can pass a 30-minute load test and fail an 8-hour soak. For retail I would run this before any major promotional campaign.\n\nSpike testing simulates a sudden sharp surge, like a flash sale or social-media-driven traffic burst. The system goes from idle to heavy load in seconds. You are testing whether auto-scaling triggers in time, whether the application queues properly, and whether there is graceful degradation or cascading failure.\n\nFor Albertsons I would run load and endurance tests every release cycle and spike tests in the weeks before major holiday campaigns."
      },
      {
        q: "How do you build a workload model from production data?",
        a: "A workload model is only as good as the production data it is built from, so I start there.\n\nI pull access logs, APM transaction traces, and real user monitoring data to understand traffic patterns. From that I derive three things: the transaction mix, what percentage of users are doing what; the arrival rate, how many users per second are initiating sessions at peak; and the think time distribution, how long users pause between steps, which determines realistic concurrency.\n\nFrom the transaction mix I build scenarios in the load tool where each virtual user follows a probability-weighted path through the application. If 60% of real users are browsing, 25% are searching, and 15% are completing a purchase, my virtual user population should reflect that.\n\nI also profile seasonal variation. Retail specifically has a very different peak profile on Black Friday versus a regular Tuesday. I would model at least three profiles: off-peak, normal peak, and promotional peak.\n\nOne thing I always validate before a test is whether the workload model correlates to real traffic. I compare response time distribution in the test environment at low load against production monitoring data, to confirm the scripted flows behave like real users and not artificially."
      },
      {
        q: "How do you integrate performance testing into a CI/CD pipeline?",
        a: "The principle is shift-left: catch performance regressions in the pipeline before they reach production, not after.\n\nPractically, I add a performance validation stage in the pipeline after integration tests pass. This stage spins up the test environment, runs a time-boxed load test, typically 15 to 20 minutes for a regression check, and compares key metrics against a baseline: p95 response time, throughput, and error rate. If any metric breaches a defined threshold, the stage fails the pipeline and blocks promotion.\n\nAt ProfitApps I am building this with Jenkins. The pipeline has three stages: build, promote to staging, and deploy to production. The performance gate sits at the promote stage. I use JMeter for quick regression checks in the pipeline and reserve the full NetStorm-based load and endurance tests for pre-release validation cycles.\n\nThe pipeline test is not meant to replace a full performance test. It is a regression detector. If something regresses by 20% in p95 latency, the pipeline catches it, the developer is notified with the baseline comparison, and it gets investigated before it goes further."
      },
      {
        q: "How do you approach JVM tuning in a performance context?",
        a: "I approach JVM tuning as a diagnostic exercise, not a parameter-twiddling exercise. Tuning without understanding the symptoms usually makes things worse.\n\nThe starting point is GC log analysis. I look at GC frequency, GC pause duration, and heap utilization over time, particularly during and after load tests. If I see frequent full GC events or long stop-the-world pauses, that points to heap sizing or GC algorithm mismatch.\n\nA common scenario: an application performing well at 200 users but showing response time spikes at 400 users that correlate with major GC events in the logs. The fix is often increasing the old generation heap size or switching from parallel GC to G1GC for more predictable pause times.\n\nI also look at thread pool saturation. If thread count is maxed and threads are queued, that is a concurrency configuration issue, not a GC issue.\n\nMy role is to identify these patterns and translate them into specific, evidence-backed recommendations for the development team along with suggested JVM flag changes and the expected impact. I do not make those changes unilaterally. It is a collaborative handoff with data."
      },
      {
        q: "How do you handle performance testing when third-party dependencies like a payment gateway are involved?",
        a: "For dependencies like payment gateways, you almost never load test against the real endpoint. It is too risky, too expensive, and that service's SLA is not yours to test. The standard approach is to stub or mock the dependency.\n\nAt Cavisson, we used a service virtualization layer for exactly this. We would record the real API responses during a baseline run and then replay them from a local stub during load tests. This lets you test the full end-to-end flow, including the code paths that handle payment responses, without hitting the actual gateway.\n\nThe caveat is that you are not testing the gateway's own performance, so you must be explicit about that in test reports. SLA targets for the full checkout flow need to be adjusted to exclude the mocked service latency, and you document that boundary clearly so stakeholders understand what is and is not covered.\n\nIf you do need to characterize the gateway's own latency contribution, you do that separately with a small controlled test against a sandbox environment, and add that p95 latency as a known offset in your overall response time budget."
      },
      {
        q: "Describe how you use Dynatrace for post-test performance analysis.",
        a: "During the test run I have Dynatrace instrumented on the application nodes, and I align the test timeline in Dynatrace using the load injection start and end times as markers.\n\nPost-test, I start at the service-level response time breakdown. Dynatrace's distributed trace visualization lets me see exactly how much time is spent in each tier: application code, downstream service calls, and database queries, for any given transaction type.\n\nFor transactions that breached SLA, I drill into the slowest traces. Dynatrace auto-captures slow transactions so I can see the exact method-level breakdown: where time was spent, which database call was slow, which external call timed out.\n\nI also use the infrastructure view to correlate application performance with host-level metrics including CPU, memory, GC activity, and network. Sometimes a response time spike correlates perfectly with a GC event or CPU saturation on a specific application node, which narrows the diagnosis significantly.\n\nThe output of my analysis is a structured report: a test summary with pass or fail against SLA, a list of bottlenecks ranked by impact, root cause findings with trace evidence, and specific recommendations per finding addressed to the right team: dev, DBA, or infrastructure."
      }
    ]
  },
  {
    id: "devops",
    label: "Round 3 - DevOps & Cloud Infrastructure",
    color: "#7c3aed",
    accent: "#ede9fe",
    icon: "⚙️",
    intro: "Expect questions on Kubernetes, Terraform, Jenkins, and CI/CD. Albertsons likely runs hybrid cloud. Speak to reliability, automation, and scale.",
    questions: [
      {
        q: "How do you design a CI/CD pipeline for a microservices application?",
        a: "I design pipelines in stages, each with a clear gate before the next stage proceeds.\n\nThe pipeline I built at Kloud9 and the one I am building at ProfitApps both follow a build-promote-deploy pattern.\n\nThe build stage handles source checkout, dependency resolution, compilation, unit tests, static code analysis, and Docker image creation. The image is tagged with the git commit SHA and pushed to the artifact registry.\n\nThe promote stage is where the image goes to staging. Integration tests run, performance regression checks run, and security scans execute. Promotion only proceeds if all gates pass.\n\nThe deploy stage handles the actual rollout using Helm to deploy to Kubernetes with a rolling update strategy for zero-downtime deployments. Rollback is automated: if the post-deploy health check fails within a set window, the pipeline reverts to the previous Helm release.\n\nFor multi-service pipelines I also manage deployment ordering when services have dependencies, and I implement environment-specific configuration using Helm values files per environment rather than hardcoding anything in the pipeline itself."
      },
      {
        q: "How have you used Terraform at scale? What challenges did you face?",
        a: "At Kloud9 I built a Terraform module library covering our full AWS and GCP provisioning needs: VPCs, EKS clusters, GKE clusters, IAM roles, RDS instances, and S3 buckets, all as reusable modules with consistent input and output contracts.\n\nThe biggest structural challenge was state management across multiple environments. We used a remote backend with S3 and DynamoDB locking on AWS, and GCS on GCP, and structured the state files per environment and per service. This gave us isolation so a change in staging could not affect production state.\n\nOne challenge I solved early was environment drift. When different teams were running Terraform manually, environments would diverge over time. I addressed this by enforcing Terraform runs only through Jenkins: no manual applies allowed in production. The pipeline ran plan on every PR and required human approval before apply in production, giving us both auditability and safety.\n\nThe result was that environment provisioning time dropped from several days to under an hour."
      },
      {
        q: "How do you manage Kubernetes cluster reliability and autoscaling?",
        a: "My approach to cluster reliability is built on three pillars: observability, resource governance, and autoscaling.\n\nFor observability, I instrument every cluster with Prometheus and Grafana and set up alerts on signals that actually predict problems: node CPU pressure, memory pressure, pod eviction rate, and API server latency, rather than just alerting on failures after they happen.\n\nFor resource governance, every workload has defined resource requests and limits. Without these you get noisy-neighbor problems where one runaway pod starves others. I enforce this through admission policies.\n\nFor autoscaling, I use HPA at the pod level, scaling based on CPU and custom metrics, and Cluster Autoscaler at the node level. HPA reacts to load within seconds while Cluster Autoscaler takes a few minutes to provision new nodes, so I size the initial capacity to absorb burst traffic during that provisioning window.\n\nAt Kloud9 this combination is how we maintained 99.9% uptime across production. I also implemented PodDisruptionBudgets to ensure that rolling updates and node drains never took down more than a safe percentage of replicas at once."
      },
      {
        q: "How do you handle secrets management in your pipelines?",
        a: "I never store secrets in source code, pipeline scripts, or environment variables that could appear in logs. That is the baseline rule.\n\nIn practice I have used AWS Secrets Manager and HashiCorp Vault for secret storage, with pipeline credentials being short-lived tokens retrieved at runtime rather than static values stored in Jenkins credentials.\n\nFor Kubernetes workloads I use Kubernetes Secrets mounted as environment variables or volumes, with the secrets themselves sourced from the external secrets store via the External Secrets Operator, so the Kubernetes Secrets are never the source of truth: they are synced copies.\n\nI also enforce secret rotation policies: credentials used in production pipelines rotate on a schedule and the rotation is automated so it does not require manual intervention."
      }
    ]
  },
  {
    id: "scenario",
    label: "Round 4 - Scenario & Behavioral",
    color: "#b45309",
    accent: "#fef3c7",
    icon: "🧩",
    intro: "Behavioral and situational questions testing your judgment under ambiguity. Use STAR format: Situation, Task, Action, Result.",
    questions: [
      {
        q: "Our checkout page is slow during peak promotions. How would you approach this?",
        a: "This is a performance triage scenario and I would approach it in two parallel tracks: immediate mitigation and systematic root cause analysis.\n\nOn the immediate mitigation side, if this is a live incident, I would look at whether auto-scaling is configured and keeping up. If the application can scale horizontally, adding capacity buys time while the investigation runs. I would also check whether circuit breakers or rate limiters are in place to protect downstream services from being overwhelmed.\n\nFor root cause analysis I would instrument the investigation across three tiers simultaneously. At the application tier I would use APM traces to identify which transaction types are slowest and where the time is being spent. At the infrastructure tier I would look at CPU, memory, connection pool saturation, and GC activity. At the database tier I would pull slow query logs and look for queries doing full scans or with high wait times under concurrent load.\n\nIn my experience, peak promotion performance issues in retail fall into one of a few patterns: a query that is fine at low concurrency but fails under lock contention at peak; a connection pool that exhausts because each request holds a connection too long; or a cache miss storm when a new promotional page invalidates cache entries simultaneously for thousands of users.\n\nOnce the root cause is identified I would produce a prioritized recommendation list with immediate actions, short-term fixes, and architectural recommendations, and present it to the dev, DBA, and infrastructure teams with specific evidence for each finding."
      },
      {
        q: "How do you handle a situation where the development team pushes back on your performance findings?",
        a: "I treat it as a communication and trust problem first, not a technical argument.\n\nThe most common reason developers push back on performance findings is that the findings feel like a criticism of their code, or the findings are not specific enough to be actionable. If I walk into a room and say the application is slow, that is not useful. If I say the product search endpoint has a p95 response time of 4.2 seconds under 200 concurrent users, and Dynatrace traces show 3.8 of those seconds in one specific SQL query doing a full scan, and here is the query and the execution plan, that is hard to argue with.\n\nI have also learned that showing developers the trace data themselves, walking them through the Dynatrace waterfall or flame graph, is much more effective than handing them a report. When they see it in the tool they use, it becomes their finding, not mine.\n\nIn cases where there is genuine disagreement about root cause, I propose a test: let us change one variable, re-run the test, and see if the metric moves. The data resolves the disagreement without it becoming personal.\n\nIf the pushback is about prioritization rather than validity of the finding, that is a conversation for the team lead. I provide the technical severity assessment and leave the prioritization decision to the right stakeholders."
      },
      {
        q: "Tell me about a time you improved a process significantly.",
        a: "The clearest example is what I did with infrastructure provisioning at Kloud9.\n\nWhen I joined, spinning up a new environment, dev, staging, or a new client environment, was a largely manual process that took anywhere from two days to a week depending on complexity. Engineers were making changes by hand and the process was undocumented enough that only a few people could do it reliably. This created a bottleneck every time we needed a new environment for a release cycle.\n\nMy task was to systematize this. I spent the first few weeks documenting every step of the existing process, then rebuilt it as Terraform modules: one for networking, one for compute, one for Kubernetes, and one for IAM. I structured them so you could compose any environment from those building blocks using a single input file per environment.\n\nI then wired these into Jenkins so that provisioning a new environment was a pipeline run, not a manual task. The pipeline ran plan for review and apply on approval.\n\nThe result was that provisioning time dropped from days to under an hour. More importantly, environments were now consistent with no drift. Release frequency went up 40% in part because the bottleneck on environment availability was removed."
      }
    ]
  },
  {
    id: "scripts",
    label: "Round 5 - Shell & Python Scripts",
    color: "#0f766e",
    accent: "#ccfbf1",
    icon: "💻",
    intro: "Practical scripting questions. Focus areas: log analysis, alerting, automation, performance data parsing. Each script includes a talking point.",
    questions: [
      {
        q: "Shell: Monitor CPU and memory, alert if thresholds are breached",
        a: `#!/bin/bash
# monitor_resources.sh
# Monitors CPU and memory and logs an alert if thresholds are breached.
# Schedule with cron: */5 * * * * /path/to/monitor_resources.sh

CPU_THRESHOLD=80
MEM_THRESHOLD=85
LOG_FILE="/var/log/resource_monitor.log"
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

# CPU usage (user + system from top)
CPU_USAGE=$(top -bn1 | grep "Cpu(s)" | awk '{print $2 + $4}' | cut -d. -f1)

# Memory usage percentage
MEM_USAGE=$(free | grep Mem | awk '{printf "%.0f", $3/$2 * 100}')

echo "[$TIMESTAMP] CPU: \${CPU_USAGE}%  MEM: \${MEM_USAGE}%"

if [ "$CPU_USAGE" -gt "$CPU_THRESHOLD" ]; then
  MSG="[$TIMESTAMP] ALERT: CPU \${CPU_USAGE}% exceeds threshold \${CPU_THRESHOLD}%"
  echo "$MSG" | tee -a "$LOG_FILE"
  # Route to Slack or PagerDuty webhook in production
fi

if [ "$MEM_USAGE" -gt "$MEM_THRESHOLD" ]; then
  MSG="[$TIMESTAMP] ALERT: Memory \${MEM_USAGE}% exceeds threshold \${MEM_THRESHOLD}%"
  echo "$MSG" | tee -a "$LOG_FILE"
fi

# TALKING POINT: In production I would route alerts to a PagerDuty
# or Slack webhook and store metrics in a time-series DB for trending.`
      },
      {
        q: "Shell: Parse a JMeter JTL results file and compute p95 response time per endpoint",
        a: `#!/bin/bash
# parse_jmeter_results.sh
# Parses a JMeter JTL CSV file and computes p50/p95/p99 per transaction.
# JTL format: timeStamp,elapsed,label,responseCode,success,...
# Usage: ./parse_jmeter_results.sh results.jtl

JTL_FILE="\${1:-results.jtl}"
OUTPUT="perf_summary_$(date +%Y%m%d_%H%M%S).txt"

if [ ! -f "$JTL_FILE" ]; then
  echo "ERROR: File not found: $JTL_FILE"; exit 1
fi

echo "Performance Summary - $(date)" > "$OUTPUT"
echo "Source: $JTL_FILE" >> "$OUTPUT"
echo "-------------------------------------------" >> "$OUTPUT"

LABELS=$(awk -F',' 'NR>1 {print $3}' "$JTL_FILE" | sort -u)

for LABEL in $LABELS; do
  TIMES=$(awk -F',' -v lbl="$LABEL" \
    'NR>1 && $3==lbl {print $2}' "$JTL_FILE" | sort -n)
  COUNT=$(echo "$TIMES" | wc -l)
  [ "$COUNT" -eq 0 ] && continue

  P95_IDX=$(echo "($COUNT * 95 / 100)" | bc)
  P99_IDX=$(echo "($COUNT * 99 / 100)" | bc)
  P50_IDX=$(echo "($COUNT * 50 / 100)" | bc)

  P50=$(echo "$TIMES" | sed -n "\${P50_IDX}p")
  P95=$(echo "$TIMES" | sed -n "\${P95_IDX}p")
  P99=$(echo "$TIMES" | sed -n "\${P99_IDX}p")
  AVG=$(echo "$TIMES" | awk '{s+=$1} END{printf "%.0f",s/NR}')

  echo "" >> "$OUTPUT"
  echo "Transaction : $LABEL" >> "$OUTPUT"
  echo "  Count     : $COUNT" >> "$OUTPUT"
  echo "  Avg       : \${AVG} ms" >> "$OUTPUT"
  echo "  P50       : \${P50} ms" >> "$OUTPUT"
  echo "  P95       : \${P95} ms" >> "$OUTPUT"
  echo "  P99       : \${P99} ms" >> "$OUTPUT"
done

cat "$OUTPUT"
echo "Report saved: $OUTPUT"

# TALKING POINT: I would extend this to compare against SLA thresholds
# and fail the CI/CD pipeline stage if any transaction exceeds its budget.`
      },
      {
        q: "Python: Analyze app logs and identify slow API endpoints above an SLA threshold",
        a: `#!/usr/bin/env python3
"""
slow_api_analyzer.py
Parses JSON-lines app logs and identifies slow API endpoints.

Log format per line:
{"timestamp":"...","endpoint":"/api/cart","response_time_ms":1250,"status_code":200}

Usage:
  python3 slow_api_analyzer.py --file app.log --threshold 1000 --top 10
"""
import json, argparse, statistics
from collections import defaultdict

def parse_args():
    p = argparse.ArgumentParser()
    p.add_argument("--file", required=True)
    p.add_argument("--threshold", type=int, default=1000)
    p.add_argument("--top", type=int, default=10)
    return p.parse_args()

def load_logs(path):
    records = []
    with open(path) as f:
        for i, line in enumerate(f, 1):
            line = line.strip()
            if not line:
                continue
            try:
                records.append(json.loads(line))
            except json.JSONDecodeError:
                print(f"  [WARN] Skipping malformed line {i}")
    return records

def percentile(sorted_data, pct):
    idx = max(0, int(len(sorted_data) * pct / 100) - 1)
    return sorted_data[idx]

def analyze(records, threshold):
    buckets = defaultdict(list)
    for r in records:
        ep = r.get("endpoint", "unknown")
        rt = r.get("response_time_ms")
        if rt is not None:
            buckets[ep].append(rt)

    results = []
    for ep, times in buckets.items():
        s = sorted(times)
        breaches = [t for t in times if t > threshold]
        results.append({
            "endpoint": ep,
            "count": len(s),
            "breach_count": len(breaches),
            "breach_pct": round(len(breaches) / len(s) * 100, 1),
            "avg": round(statistics.mean(times)),
            "p50": percentile(s, 50),
            "p95": percentile(s, 95),
            "p99": percentile(s, 99),
        })
    results.sort(key=lambda x: x["p95"], reverse=True)
    return results

def report(results, threshold, top):
    print(f"\n{'='*65}")
    print(f"  API Slow Endpoint Report  |  SLA Threshold: {threshold}ms")
    print(f"{'='*65}")
    print(f"\n{'Endpoint':<35} {'Calls':>6} {'Breach%':>8} {'P95':>7} {'P99':>7}")
    print("-" * 65)
    for r in results[:top]:
        flag = " !" if r["breach_pct"] > 5 else ""
        print(f"{r['endpoint']:<35} {r['count']:>6} "
              f"{r['breach_pct']:>7}% {r['p95']:>6}ms {r['p99']:>6}ms{flag}")

    critical = [r for r in results if r["p95"] > threshold]
    if critical:
        print(f"\nEndpoints with P95 above {threshold}ms SLA:")
        for r in critical:
            print(f"  - {r['endpoint']}  P95={r['p95']}ms  P99={r['p99']}ms")
    else:
        print(f"\nAll endpoints within SLA threshold of {threshold}ms")

if __name__ == "__main__":
    args = parse_args()
    records = load_logs(args.file)
    print(f"Loaded {len(records)} records from {args.file}")
    results = analyze(records, args.threshold)
    report(results, args.threshold, args.top)

# TALKING POINT: I wire this into a Jenkins post-build step to produce
# a summary artifact, or to fail the build if breach rates exceed a limit.`
      },
      {
        q: "Python: Check Kubernetes pod health and alert on CrashLoopBackOff or Pending pods",
        a: `#!/usr/bin/env python3
"""
k8s_health_check.py
Checks Kubernetes pod health and alerts on problem states.
Uses kubectl subprocess - no extra Python dependencies required.

Usage:
  python3 k8s_health_check.py --namespace production
  python3 k8s_health_check.py --all-namespaces
"""
import subprocess, json, argparse, sys
from datetime import datetime

ALERT_STATES = {"CrashLoopBackOff", "OOMKilled", "Error", "ImagePullBackOff"}
ALERT_PHASES = {"Pending", "Failed", "Unknown"}

def parse_args():
    p = argparse.ArgumentParser()
    g = p.add_mutually_exclusive_group(required=True)
    g.add_argument("--namespace")
    g.add_argument("--all-namespaces", action="store_true")
    p.add_argument("--output", help="Write report to this file")
    return p.parse_args()

def get_pods(namespace=None, all_namespaces=False):
    cmd = ["kubectl", "get", "pods", "-o", "json"]
    if all_namespaces:
        cmd.append("--all-namespaces")
    elif namespace:
        cmd.extend(["-n", namespace])
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        print(f"ERROR: kubectl failed:\n{r.stderr.strip()}")
        sys.exit(1)
    return json.loads(r.stdout)["items"]

def analyze(pods):
    healthy, unhealthy = [], []
    for pod in pods:
        name = pod["metadata"]["name"]
        ns   = pod["metadata"]["namespace"]
        phase = pod["status"].get("phase", "Unknown")
        node  = pod["spec"].get("nodeName", "unscheduled")
        issues = []
        for cs in pod["status"].get("containerStatuses", []):
            waiting    = cs.get("state", {}).get("waiting", {})
            terminated = cs.get("state", {}).get("terminated", {})
            reason = waiting.get("reason") or terminated.get("reason", "")
            restarts = cs.get("restartCount", 0)
            if reason in ALERT_STATES:
                issues.append({"container": cs["name"],
                                "reason": reason, "restarts": restarts})
        entry = {"name": name, "namespace": ns,
                 "phase": phase, "node": node, "issues": issues}
        (unhealthy if phase in ALERT_PHASES or issues else healthy).append(entry)
    return healthy, unhealthy

def print_report(healthy, unhealthy, output=None):
    ts = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    lines = [
        f"\n{'='*55}",
        f"  K8s Pod Health Report  |  {ts}",
        f"{'='*55}",
        f"\nHealthy pods  : {len(healthy)}",
        f"Unhealthy pods: {len(unhealthy)}\n"
    ]
    if unhealthy:
        lines.append("--- Unhealthy Pods ---\n")
        for p in unhealthy:
            lines.append(f"  Pod   : {p['namespace']}/{p['name']}")
            lines.append(f"  Phase : {p['phase']}  Node: {p['node']}")
            for i in p["issues"]:
                lines.append(f"  Issue : {i['container']} "
                              f"Reason={i['reason']} Restarts={i['restarts']}")
            lines.append("")
    else:
        lines.append("All pods are healthy.\n")
    report = "\n".join(lines)
    print(report)
    if output:
        with open(output, "w") as f:
            f.write(report)
        print(f"Report saved: {output}")
    return len(unhealthy) > 0

if __name__ == "__main__":
    args = parse_args()
    pods = get_pods(
        namespace=getattr(args, "namespace", None),
        all_namespaces=args.all_namespaces
    )
    has_issues = print_report(*analyze(pods), output=args.output)
    # Exit code 1 if unhealthy pods found - useful as a CI/CD deploy gate
    sys.exit(1 if has_issues else 0)

# TALKING POINT: I wire this into a post-deploy Jenkins step.
# Exit code 1 halts the pipeline and pages the on-call engineer.`
      }
    ]
  },
  {
    id: "questions",
    label: "Your Questions for the Interviewer",
    color: "#475569",
    accent: "#f1f5f9",
    icon: "🙋",
    intro: "Always ask 2-3 smart questions. It signals genuine interest and helps you evaluate the role. Pick the ones most natural to you.",
    questions: [
      {
        q: "What does the performance engineering practice look like at Albertsons today?",
        a: "Is there a dedicated performance engineering team, or is performance testing distributed across feature teams? I ask because I have worked in both models and I am curious about how performance testing is currently integrated into your release lifecycle and where you see the biggest opportunities to mature that practice."
      },
      {
        q: "What are the biggest infrastructure or reliability challenges the team is currently facing?",
        a: "Understanding the real friction points tells me a lot about where I can add value quickly. If it is around CI/CD bottlenecks or environment consistency, my Terraform and pipeline work maps directly. If it is more around production performance and observability, my APM and performance engineering background is the fit."
      },
      {
        q: "How does the team approach on-call and incident management?",
        a: "I want to understand the culture around production ownership: whether engineers are on a rotation, how runbooks and post-mortems are handled, and what tooling you use for alerting and incident response. I have found that strong runbooks make a significant difference in mean time to resolution, and I am curious whether that is a practice the team invests in."
      }
    ]
  }
];

function CodeBlock({ code }) {
  const [copied, setCopied] = useState(false);
  return (
    <div style={{ position: "relative", marginTop: 10 }}>
      <button
        onClick={() => {
          navigator.clipboard.writeText(code).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          });
        }}
        style={{
          position: "absolute", top: 8, right: 8,
          background: copied ? "#059669" : "#1e293b",
          color: "#fff", border: "none", borderRadius: 5,
          padding: "4px 12px", fontSize: 11, cursor: "pointer", zIndex: 2
        }}
      >
        {copied ? "Copied!" : "Copy"}
      </button>
      <pre style={{
        background: "#0f172a", color: "#e2e8f0",
        padding: "40px 16px 16px", borderRadius: 8,
        fontSize: 12, lineHeight: 1.6, overflowX: "auto",
        whiteSpace: "pre", fontFamily: "monospace", margin: 0
      }}>{code}</pre>
    </div>
  );
}

function QCard({ q, a, isCode }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      border: "1px solid #e2e8f0", borderRadius: 8, marginBottom: 8,
      overflow: "hidden", background: "#fff"
    }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: "100%", textAlign: "left", background: open ? "#f8fafc" : "#fff",
          border: "none", padding: "13px 16px", cursor: "pointer",
          display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8
        }}
      >
        <span style={{ fontWeight: 600, fontSize: 14, color: "#1e293b", lineHeight: 1.4 }}>
          {isCode ? "💻 " : "❓ "}{q}
        </span>
        <span style={{ fontSize: 16, color: "#94a3b8", flexShrink: 0, marginTop: 2 }}>
          {open ? "▲" : "▼"}
        </span>
      </button>
      {open && (
        <div style={{ padding: "0 16px 16px", background: "#f8fafc", borderTop: "1px solid #e2e8f0" }}>
          {isCode
            ? <CodeBlock code={a} />
            : <p style={{ fontSize: 14, color: "#334155", lineHeight: 1.8, margin: "14px 0 0", whiteSpace: "pre-line" }}>{a}</p>
          }
        </div>
      )}
    </div>
  );
}

function RoundCard({ round }) {
  const [open, setOpen] = useState(false);
  const isCode = round.id === "scripts";
  return (
    <div style={{
      marginBottom: 14, borderRadius: 10, overflow: "hidden",
      border: `1.5px solid ${round.color}33`,
      boxShadow: "0 1px 4px rgba(0,0,0,0.05)"
    }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: "100%", textAlign: "left", cursor: "pointer", border: "none",
          background: open ? round.accent : "#fff",
          padding: "16px 20px",
          display: "flex", alignItems: "center", gap: 12
        }}
      >
        <span style={{ fontSize: 24 }}>{round.icon}</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: 15, color: round.color }}>{round.label}</div>
          <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>
            {round.questions.length} {isCode ? "scripts" : "questions"}
          </div>
        </div>
        <span style={{ fontSize: 18, color: round.color }}>{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div style={{ padding: "0 18px 18px", background: "#fafbfc" }}>
          <div style={{
            background: round.accent, borderLeft: `4px solid ${round.color}`,
            borderRadius: 6, padding: "10px 14px", margin: "14px 0",
            fontSize: 13, color: "#334155", lineHeight: 1.5
          }}>
            {round.intro}
          </div>
          {round.questions.map((item, i) => (
            <QCard key={i} q={item.q} a={item.a} isCode={isCode} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <div style={{
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      maxWidth: 780, margin: "0 auto", padding: "24px 14px",
      background: "#f1f5f9", minHeight: "100vh"
    }}>
      <div style={{
        background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
        borderRadius: 12, padding: "26px 24px 22px", marginBottom: 20, color: "#fff"
      }}>
        <div style={{ fontSize: 10, letterSpacing: 2, color: "#94a3b8", marginBottom: 5, textTransform: "uppercase" }}>
          Interview Preparation Guide
        </div>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800 }}>Albertsons Companies</h1>
        <p style={{ margin: "6px 0 0", fontSize: 13, color: "#cbd5e1" }}>
          Lavu Praveen Babu &middot; Senior DevOps &amp; Performance Engineer
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginTop: 14 }}>
          {["Performance Engineering", "CI/CD", "Kubernetes", "Terraform", "AWS / GCP", "Shell / Python"].map(t => (
            <span key={t} style={{
              background: "#334155", color: "#94a3b8",
              fontSize: 11, padding: "3px 10px", borderRadius: 20
            }}>{t}</span>
          ))}
        </div>
      </div>

      <div style={{
        background: "#fefce8", border: "1px solid #fde047",
        borderRadius: 8, padding: "11px 14px", marginBottom: 18,
        fontSize: 13, color: "#713f12", lineHeight: 1.5
      }}>
        <strong>How to use:</strong> Every answer is written to sound natural when spoken aloud. Read each answer twice before your interview: once to understand it, once to make it yours. Tap any question to expand.
      </div>

      {ROUNDS.map(r => <RoundCard key={r.id} round={r} />)}

      <div style={{ textAlign: "center", padding: "16px 0 4px", fontSize: 11, color: "#94a3b8" }}>
        Tailored for Lavu Praveen Babu &middot; Albertsons Interview Prep &middot; 2026
      </div>
    </div>
  );
}
