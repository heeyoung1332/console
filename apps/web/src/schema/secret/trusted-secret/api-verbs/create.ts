import type { Tags } from '@/schema/_common/model';
import type { ResourceGroup } from '@/schema/identity/role-binding/type';

export interface TrustedSecretCreateParameters {
    name: string;
    data: Record<string, any>
    tags?: Tags,
    schema_id?: string,
    trusted_account_id?: string,
    permission_group: ResourceGroup,
    project_id?: string,
    workspace_id?: string,
}
