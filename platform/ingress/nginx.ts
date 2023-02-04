import * as k8s from "@pulumi/kubernetes";

const nginx = new k8s.helm.v3.Release("nginx", {
    chart: "nginx",
    version: "13.2.22",
    namespace: "default",
    name: 'nginx',
    createNamespace: true,
    repositoryOpts: {
        repo: "https://charts.bitnami.com/bitnami",
    },
    values: {
        ingress: {
            tls: true,
            enabled: true,
            hostname: 'nginx.danielrichter.codes',
            ingressClassName: 'public',
            annotations: {
                "cert-manager.io/cluster-issuer": "letsencrypt-prod"
            }
        }
    }
});


