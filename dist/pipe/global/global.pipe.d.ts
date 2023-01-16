import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
export declare class GlobalPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata): any;
}
