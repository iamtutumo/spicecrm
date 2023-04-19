<?php
/***** SPICE-HEADER-SPACEHOLDER *****/
use SpiceCRM\includes\SpiceDictionary\SpiceDictionaryHandler;
use SpiceCRM\includes\SugarObjects\VardefManager;

SpiceDictionaryHandler::getInstance()->dictionary['Agreement'] = [
    'table' => 'agreements',
    'fields' => [
        'valid_from' => [
            'name' => 'valid_from',
            'vname' => 'LBL_VALID_FROM',
            'type' => 'date',
            'comment' => 'Valid from'
        ],
        'valid_to' => [
            'name' => 'valid_to',
            'vname' => 'LBL_VALID_UNTIL',
            'type' => 'date',
            'comment' => 'Valid to'
        ],
        //parent
        'parent_id' => [
            'name' => 'parent_id',
            'vname' => 'LBL_LIST_RELATED_TO_ID',
            'type' => 'id',
            'comment' => 'The ID of the parent Sugar object identified by parent_type'
        ],
        'parent_type' => [
            'name' => 'parent_type',
            'vname' => 'LBL_PARENT_TYPE',
            'type' => 'parent_type',
            'dbType' => 'varchar',
            'required' => false,
            'len' => 255,
            'comment' => 'The Sugar object to which the Agreement is related',
        ],
        'parent_name' => [
            'name' => 'parent_name',
            'type_name' => 'parent_type',
            'id_name' => 'parent_id',
            'vname' => 'LBL_RELATED_TO',
            'type' => 'parent',
            'source' => 'non-db',
        ],
        'category_1' => [
            'name' => 'category_1',
            'vname' => 'LBL_CATEGORY1',
            'type' => 'varchar',
            'len' => 32,
            'comment' => 'Field for the agreement category tree'
        ],
        'category_2' => [
            'name' => 'category_2',
            'vname' => 'LBL_CATEGORY2',
            'type' => 'varchar',
            'len' => 32,
            'comment' => 'Field for the agreement category tree'
        ],
        'category_3' => [
            'name' => 'category_3',
            'vname' => 'LBL_CATEGORY3',
            'type' => 'varchar',
            'len' => 32,
            'comment' => 'Field for the agreement category tree'
        ],
        'category_4' => [
            'name' => 'category_4',
            'vname' => 'LBL_CATEGORY4',
            'type' => 'varchar',
            'len' => 32,
            'comment' => 'Field for the agreement category tree'
        ],
        'is_valid' => [
            'name' => 'is_valid',
            'vname' => 'LBL_VALID',
            'type' => 'bool',
            'source' => 'non-db',
            'comment' => 'Comparing the validation date of the agreement (valid from with today\'s date)'
        ],
        'agreement_status' => [
            'name' => 'agreement_status',
            'vname' => 'LBL_STATUS',
            'type' => 'enum',
            'options' => 'agreement_status_dom',
            'comment' => 'Status of the agreement'
        ],
        'accounts_rel' => [
            'name' => 'accounts_rel',
            'type' => 'link',
            'relationship' => 'agreements_accounts',
            'module' => 'Accounts',
            'bean_name' => 'Account',
            'source' => 'non-db',
            'vname' => 'LBL_ACCOUNTS',
            'comment' => 'many-2-many relationship link'
        ],
        'contacts_rel' => [
            'name' => 'contacts_rel',
            'type' => 'link',
            'relationship' => 'agreements_contacts',
            'module' => 'Contacts',
            'bean_name' => 'Contact',
            'source' => 'non-db',
            'vname' => 'LBL_CONTACTS',
            'comment' => 'many-2-many relationship link'
        ],
        'agreementrevisions' => [
            'name' => 'agreementrevisions',
            'type' => 'link',
            'relationship' => 'agreements_agreementrevisions',
            'vname' => 'LBL_AGREEMENT_REVISIONS',
            'module' => 'AgreementRevisions',
            'table' => 'agreementrevisions',
            'source' => 'non-db',
            'default' => true
        ],
        'agreementconditions' => [
            'name' => 'agreementconditions',
            'type' => 'link',
            'relationship' => 'agreements_agreementconditions',
            'vname' => 'LBL_AGREEMENT_CONDITIONS',
            'module' => 'AgreementConditions',
            'table' => 'agreementconditions',
            'source' => 'non-db'
        ],
    ],
    'relationships' => [
        'account_agreements' => [
            'lhs_module' => 'Accounts',
            'lhs_table' => 'accounts',
            'lhs_key' => 'id',
            'rhs_module' => 'Agreements',
            'rhs_table' => 'agreements',
            'rhs_key' => 'parent_id',
            'relationship_type' => 'one-to-many',
            'relationship_role_column' => 'parent_type',
            'relationship_role_column_value' => 'Accounts',
            'comment' => 'One-2-many relationship'
        ],
        'consumer_agreements' => [
            'lhs_module' => 'Consumers',
            'lhs_table' => 'consumers',
            'lhs_key' => 'id',
            'rhs_module' => 'Agreements',
            'rhs_table' => 'agreements',
            'rhs_key' => 'parent_id',
            'relationship_type' => 'one-to-many',
            'relationship_role_column' => 'parent_type',
            'relationship_role_column_value' => 'Consumers',
            'comment' => 'One-2-many relationship'
        ],
    ],
    'indices' => [
        ['name' => 'idx_agreements_status', 'type' => 'index', 'fields' => ['agreement_status', 'deleted']]
    ]
];

VardefManager::createVardef('Agreements', 'Agreement', ['default', 'assignable']);
