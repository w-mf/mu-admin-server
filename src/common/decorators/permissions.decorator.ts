import { SetMetadata } from '@nestjs/common';
import { META_DATA } from '~/common/constants/metadata.constant';

export const Permissions = (accessCode: string[]) => {
  return SetMetadata(META_DATA.ACCESS_CODE, accessCode);
};
