import style from './EditeBlock.module.scss';
import {Calendar} from '@/common/components/Calendar/Calendar.tsx';
import {SelectItem} from '@/common/components/SelectItem/SelectItem.tsx';
import {type ChangeEvent, useState} from 'react';
import {formatOption} from '@/common/utils/formatOption.ts';
import {Icon} from '@/common/components/Icon/Icon.tsx';
import type {Organization, UpdateContactType, UpdateType} from '@/type/type.ts';
import {toSnakeCase} from '@/common/utils/toSnakeCase.ts';
import {z} from 'zod';
import {formatPhoneNumber} from '@/common/utils/formatPhoneNumber.ts';

type Props = {
    onClose: () => void
    onSaveCompany?: (obj: UpdateType) => void
    onSaveContact?: (obj:UpdateContactType) => void
    company?: Organization
    type: 'Company' | 'Contacts'
    contact?: {
        data1: string[]
        data2: string[] | string
        data3: string[] | string
    }
}

export const EditBlock = ({onClose, company, onSaveCompany, type, contact, onSaveContact}: Props) => {
    if (type === 'Company' && company && onSaveCompany) {
        const [businessEntity, setBusinessEntity] = useState(company.businessEntity);
        const [companyType, setCompanyType] = useState(formatOption(company.type));
        const [contactNo, setContactNo] = useState(company.contract.no);
        const [contactIssueDate, setContactIssueDate] = useState(company.contract.issue_date);

        const onSaveHandle = () => {
            onSaveCompany({
                businessEntity: businessEntity as string,
                type: toSnakeCase(companyType as string[]) as string[],
                contract: {no: contactNo, issue_date: contactIssueDate},
                name: company.name,
                shortName: company.shortName
            })
        }
        return (
            <div className={style.wrapper}>
                <div className={style.titleGroup}>
                    <h3 className={style.title}>Company Details</h3>
                    <div className={style.BTNGroup}>
                        <button onClick={onSaveHandle}><span><Icon iconId={'Check'}/></span> Save changes</button>
                        <button onClick={() => onClose()}><span><Icon iconId={'X'}/></span>Cancel</button>
                    </div>
                </div>
                <div className={style.contentGroup}>
                    <div className={style.argumentText}>
                        <p>Agreement number:</p>
                        <p>Business entity:</p>
                        <p>Company type:</p>
                    </div>
                    <div className={style.content}>
                        <div className={style.dateGroup}>
                            <input onChange={(e) => setContactNo(e.currentTarget.value)} value={contactNo} type="text"/>
                            <p>Date</p>
                            <Calendar selected={contactIssueDate} onChange={(date) => setContactIssueDate(date)}/>
                        </div>
                        <div className={style.selectItem}>
                            <SelectItem
                                options={businessEntity as string[]}
                                value={businessEntity as string[]}
                                onChange={setBusinessEntity}
                            />
                            <SelectItem
                                options={formatOption(company.type) as string[]}
                                value={companyType as string[]}
                                onChange={setCompanyType}
                                multiple={true}
                            />
                        </div>

                    </div>
                </div>
            </div>
        );
    } else if (type === 'Contacts' && contact && onSaveContact) {
        const emailSchema = z.string().email('Please enter a valid email address');
        const phoneSchema = z.string()
            .refine(value => /^\+\d \d{3} \d{3} \d{4}$/.test(value), {
                message: 'Invalid phone format (use +1 234 567 8901)'
            });

        const [name, setName] = useState(contact.data1);
        const [phone, setPhone] = useState(contact.data2);
        const [email, setEmail] = useState(contact.data3);
        const [phoneError, setPhoneError] = useState('');
        const [emailError, setEmailError] = useState('');


        const validatePhone = (value: string) => {
            try {
                phoneSchema.parse(value);
                setPhoneError('');
                return true;
            } catch (error) {
                if (error instanceof z.ZodError) {
                    setPhoneError(error.errors[0].message);
                }
                return false;
            }
        };
        const validateEmail = (value: string) => {
            try {
                emailSchema.parse(value);
                setEmailError('');
                return true;
            } catch (error) {
                if (error instanceof z.ZodError) {
                    setEmailError(error.errors[0].message);
                }
                return false;
            }
        };
        const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
            const name = e.currentTarget.value;
            console.log(name.split(' '))
            setName(name.split(' '))
        }
        const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
            const formattedPhone = formatPhoneNumber(e.currentTarget.value);
            setPhone(formattedPhone);
            validatePhone(formattedPhone);
        };
        const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            console.log(value)
            setEmail(value);
            validateEmail(value);
        };
        const onSaveHandle = () => {
            const isEmailValid = validateEmail(email.toString());
            if (!isEmailValid) return;
            onSaveContact({
                firstname:name[0],
                lastname:name[1],
                phone:phone.toString().replace(/\s+/g, '').replace('+', ''),
                email:email.toString(),
            });
        };

        return (
            <div className={style.wrapper}>
                <div className={style.titleGroup}>
                    <h3 className={style.title}>Contacts</h3>
                    <div className={style.BTNGroup}>
                        <button onClick={onSaveHandle}><span><Icon iconId={'Check'}/></span> Save changes</button>
                        <button onClick={() => onClose()}><span><Icon iconId={'X'}/></span>Cancel</button>
                    </div>
                </div>
                <div className={style.contentGroup}>
                    <div className={style.contactArgument}>
                        <p>Responsible person:</p>
                        <p>Phone number:</p>
                        <p>E-mail:</p>
                    </div>
                    <div className={style.content}>
                        <div className={style.inputGroup}>
                            <input  onChange={handleNameChange} value={name.join(' ')} type="text"/>
                            <input
                                value={phone}
                                type="phone"
                                onChange={handlePhoneChange}
                            />
                            {phoneError && <span className={style.errorMessage}>{phoneError}</span>}
                            <input
                                name={'email'}
                                value={email}
                                type="email"
                                onChange={handleEmailChange}
                                className={emailError ? style.errorInput : ''}
                            />
                            {emailError && <span className={style.errorMessage}>{emailError}</span>}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};
