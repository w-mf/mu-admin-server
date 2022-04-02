import { ApiProperty } from '@nestjs/swagger';
class Cpu {
  /** model */
  model: string;
  /** 速度 */
  speed: number;
  /** 使用率 */
  rate: number;
}

class NetworkInterfaceInfo {
  /** 地址 */
  address: string;
  /**网络掩码*/
  netmask: string;
}

export class ServerInfoVo {
  /** cpu架构 */
  readonly arch: string;
  /** 操作系统内核 */
  readonly kernel: string;
  /** 操作系统平台 */
  readonly platform: string;
  /** 系统正常运行时间。单位秒 */
  readonly uptime: number;
  /** 主机名 */
  readonly hostname: string;
  /** 总内存。单位字节 */
  readonly totalMem: number;
  /** 空闲内存。单位字节 */
  readonly freeMem: number;
  /** cpu */
  @ApiProperty({ type: [Cpu] })
  readonly cpus: Cpu[];
  /** 网络 */
  @ApiProperty({ type: [NetworkInterfaceInfo] })
  readonly networks: NetworkInterfaceInfo[];
}
