export interface GlobalModal {
    modalType: GlobalModalType | null;
    modalProps: GlobalModalProps;
}

export interface GlobalModalProps {
    type: GlobalModalPropsType;
    title: string;
    description: string;
    confirmAction: () => void | null;
}

export enum GlobalModalType {
    ONE_BUTTON = 'ONE_BUTTON',
    TWO_BUTTONS = 'TWO_BUTTONS',
}

export enum GlobalModalPropsType {
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
    WARNING = 'WARNING',
    INFO = 'INFO',
}