import { Config } from "@pulumi/pulumi";
import { remote, types } from "@pulumi/command";

const buildServerConfig = new Config('buildserver')

const connection: types.input.remote.ConnectionArgs = {
    host: buildServerConfig.require('hostname'),
    user: buildServerConfig.require('username'),
    password: buildServerConfig.requireSecret('password'),
}

const script = new remote.CopyFile("template.sh", {
    connection,
    localPath: "scripts/template.sh",
    remotePath: '/tmp/template.sh'
})

const template = new remote.Command("template", {
    connection,
    create: `bash /tmp/template.sh`,
    delete: `qm destroy 9001`,
},{dependsOn: script})
