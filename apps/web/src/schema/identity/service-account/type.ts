import type { ACCOUNT_TYPE } from '@/schema/identity/service-account/constant';

export type AccountType = typeof ACCOUNT_TYPE[keyof typeof ACCOUNT_TYPE];

export interface ServiceAccountListParameter {
    domain_id?: string;
    query?: any;
    service_account_id?: string;
    name?: string;
    provider?: string;
    has_secret?: boolean;
    workspace_id?: string;
    project_id?: string;
    trusted_service_account_id?: string;
}
