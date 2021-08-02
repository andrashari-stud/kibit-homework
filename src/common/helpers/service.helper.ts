import { ObjectId } from 'mongodb';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { IWhereId } from '../interfaces/where-id.interface';
import { IWhereProp } from '../interfaces/where-prop.interface';
import { findOrder } from '../types/find-order.type';
import { FindDto } from '../dto/find.dto';
import { FindPropDto } from '../dto/find-prop.dto';

@Injectable()
export class ServiceHelper {
  getWhereByIds(ids: string[]): IWhereId {
    const $where: IWhereId = {
      _id: { $in: ids.map((mongoId: string): string => ObjectId(mongoId)) },
    };

    return $where;
  }

  getWhereByProp(propName: string, propValue: string | undefined): IWhereProp {
    const $where: IWhereProp = {};

    if (!!propName && !!propValue) {
      $where[propName] = new RegExp('.*' + propValue.toLocaleLowerCase() + '.*', 'i');
    }

    return $where;
  }

  async findAll(dto: FindDto, repository: Repository<any>): Promise<any> {
    const { skip, take, order, fieldSort }: FindDto = dto;
    const $order: findOrder = { [fieldSort]: order };

    const [result, count]: [any[], any[]] = await Promise.all([
      repository.find({
        skip,
        take,
        order: $order,
      }),
      repository.find({}),
    ]);

    return {
      items: result,
      total: count.length,
    };
  }

  async findAllByProp(dto: FindPropDto, repository: Repository<any>): Promise<any> {
    const { skip, take, propName, propValue, order, fieldSort }: FindPropDto = dto;
    const $order: findOrder = { [fieldSort]: order };
    const $where: IWhereProp = this.getWhereByProp(propName, propValue);

    const [result, count]: [any[], any[]] = await Promise.all([
      repository.find({
        skip,
        take,
        where: $where,
        order: $order,
      }),
      repository.find({
        where: $where,
      }),
    ]);

    return {
      items: result,
      total: count.length,
    };
  }
}
