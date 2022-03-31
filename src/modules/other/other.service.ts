import { Injectable } from '@nestjs/common';
import * as os from 'os';
import { ServerInfoVo } from './vo/serverInfo.vo';

@Injectable()
export class OtherService {
  async getServerInfo(): Promise<ServerInfoVo> {
    //cpu
    const cpus = (os.cpus() || []).map((cpu) => {
      const times = cpu.times;
      return {
        model: cpu.model,
        speed: cpu.speed,
        rate: +((1 - times.idle / (times.idle + times.user + times.nice + times.sys + times.irq)) * 100).toFixed(2),
      };
    });

    /** 网络 */
    const networksObj = os.networkInterfaces();
    const networks = [];
    for (const nw in networksObj) {
      const nws = (networksObj[nw] || [])
        .filter((item) => !item.internal && item.family === 'IPv4')
        .map((item) => ({ address: item.address, netmask: item.netmask }));
      networks.push(...nws);
    }

    return {
      //cpu架构
      arch: os.arch(),
      //操作系统内核
      kernel: os.type(),
      //操作系统平台
      platform: os.platform(),
      //系统正常运行时间。单位秒
      uptime: os.uptime(),
      //主机名
      hostname: os.hostname(),
      //总内存。单位字节
      totalMem: os.totalmem(),
      // 空闲内存。单位字节
      freeMem: os.freemem(),
      cpus,
      networks,
    };
  }
}
