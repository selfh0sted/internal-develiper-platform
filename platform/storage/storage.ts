import * as k8s from "@pulumi/kubernetes";

new k8s.helm.v3.Release("storage", {
    chart: "longhorn",
    version: "1.4.0",
    namespace: 'longhorn-system',
    name: 'longhorn',
    createNamespace: true,
    repositoryOpts: {
        repo: "https://charts.longhorn.io",
    },
    values: {
        csi: {
          kubeletRootDir: '/var/lib/k0s/kubelet'
        },
        ingress: {
            enabled: true,
            tls: true,
            ingressClassName: 'private',
            host: 'longhorn.dani.rip',
            tlsSecret: 'longhorn-ingress',
            annotations: {
                "cert-manager.io/cluster-issuer": "letsencrypt-prod"
            }
        }
    }
});
