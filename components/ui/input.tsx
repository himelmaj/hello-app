import React from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { useController, Control } from 'react-hook-form';

interface InputProps extends TextInputProps {
    name: string;
    control: Control<any>;
}

const Input: React.FC<InputProps> = ({ name, control, ...inputProps }) => {
    const { field } = useController({
        control,
        defaultValue: '',
        name,
    });

    return (
        <TextInput
            className='bg-gray-200 text-xl appearance-none border-2 h-12 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:bg-white focus:border-zinc-500'
            value={field.value}
            
            onChangeText={field.onChange}
            {...inputProps}
        />
    );
}

export default Input;
