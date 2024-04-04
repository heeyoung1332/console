import type { Tags } from '@/schema/_common/model';

export interface TrustedAccountUpdateParameters {
    trusted_account_id: string;
    name?: string;
    data?: Record<string, any>;
    tags?: Tags;
}
