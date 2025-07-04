'use client';
import { useState } from 'react';
import { Modal } from './Modal';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';

interface TermsModalProps {
  open: boolean;
  onClose: () => void;
  onAgree: () => void;
}

const TermsModal = ({ open, onClose, onAgree }: TermsModalProps) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleAgree = () => {
    if (isChecked) {
      onAgree();
    } else {
      toast.warning('Please accept the terms and conditions');
    }
  };

  const handleClose = () => {
    setIsChecked(false);
    onClose();
  };

  return (
    <Modal
      open={open}
      title="Website User NDA (Non-Disclosure Agreement)"
      onClose={handleClose}
      showFooter={false}
      //   okText="Accept"
    >
      <div className="space-y-4 text-gray-400">
        <ScrollArea className="h-96 w-full">
          <div className="space-y-4 text-sm">
            {/* <p className="text-center font-semibold">
              Website User NDA (Non-Disclosure Agreement)
            </p> */}

            <div className="space-y-2">
              <p className="text-emerald-500">
                <strong>Effective Date:</strong> [Date]
              </p>
              <p>
                This Non-Disclosure Agreement ("Agreement") is entered into by
                and between:
              </p>
              <p>
                <strong className="text-emerald-500">
                  Scaninfoga Solutions Private Limited
                </strong>
                , a company registered under the Companies Act, 2013, having its
                principal office at [Company Address], India (hereinafter
                referred to as the "Company" or "Disclosing Party"),
              </p>
              <p>
                <strong>AND</strong>
              </p>
              <p>
                Any individual, entity, or organization ("User" or "Receiving
                Party") accessing or registering on the website{' '}
                <strong className="text-emerald-500">
                  https://www.scaninfoga.com
                </strong>{' '}
                or using any of the Company's online tools, platforms, services,
                or data.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-emerald-500">1. Purpose</h3>
              <p>
                This Agreement ensures that Users accessing confidential,
                investigative, or sensitive data/tools through the Scaninfoga
                platform shall not disclose, misuse, or exploit any protected
                information, code, method, or identity details shared or
                available to them.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-emerald-500">
                2. Definition of Confidential Information
              </h3>
              <p>
                For this Agreement, "Confidential Information" includes, but is
                not limited to:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  Proprietary OSINT (Open Source Intelligence) data, sources,
                  tools, APIs
                </li>
                <li>Crime profiling or investigation results</li>
                <li>User search logs, activity records, reports</li>
                <li>Personal identity or sensitive government-linked data</li>
                <li>Techniques, scripts, algorithms, and source code</li>
                <li>
                  Backend architecture, modules, and methods used in the tool
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-emerald-500">
                3. User Obligations
              </h3>
              <p>
                By accessing or registering on the Scaninfoga website, the User
                agrees:
              </p>
              <ul className="list-disc space-y-1 pl-6">
                <li>
                  Not to download, distribute, record, or reuse any
                  investigation-related data unless explicitly permitted
                </li>
                <li>
                  Not to attempt reverse engineering, copying, or extraction of
                  the tool's logic or backend operations
                </li>
                <li>
                  To keep all accessed data confidential and use it only for
                  legitimate investigative purposes, where legally allowed
                </li>
                <li>
                  To not resell, expose, or share Scaninfoga's results,
                  methodologies, or platform content with third parties
                </li>
                <li>
                  To comply with all Indian and international cyber and privacy
                  regulations while using the platform
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-emerald-500">4. Exceptions</h3>
              <p>
                The confidentiality obligations shall not apply to information
                that:
              </p>
              <ul className="list-disc space-y-1 pl-6">
                <li>Is already public through no fault of the User</li>
                <li>
                  Was lawfully obtained by the User from an external, legal
                  source
                </li>
                <li>
                  Is independently developed by the User without reference to
                  Scaninfoga's tools
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-emerald-500">
                5. LEGAL COMPLIANCE & REGULATORY FRAMEWORK
              </h3>
              <p>
                This Agreement adheres to and is enforceable under the following
                legal provisions:
              </p>
              <ul className="list-disc space-y-1 pl-6">
                <li>
                  Information Technology Act, 2000 (India) – Especially Sections
                  43A and 72A for data protection and breach liability
                </li>
                <li>
                  The Indian Contract Act, 1872 – Governing the binding nature
                  of the agreement
                </li>
                <li>
                  IT (Reasonable Security Practices and Procedures and Sensitive
                  Personal Data or Information) Rules, 2011
                </li>
                <li>
                  General Data Protection Regulation (GDPR) – If any EU
                  residents' data is processed
                </li>
                <li>
                  Personal Data Protection Bill (India) – Future compliance
                </li>
                <li>
                  Digital Personal Data Protection Act, 2023 (India) – As
                  applicable
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-emerald-500">
                6. No License or Ownership
              </h3>
              <p>
                This Agreement does not grant any rights under any patents,
                copyrights, or trademarks, nor does it grant the Receiving Party
                any rights in or to the Confidential Information beyond what is
                expressly stated herein.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-emerald-500">
                7. Breach and Remedies
              </h3>
              <p>In case of violation, the Company reserves the right to:</p>
              <ul className="list-disc space-y-1 pl-6">
                <li>
                  Suspend or terminate the User's account without prior notice
                </li>
                <li>
                  Initiate legal proceedings for damages, compensation, or
                  injunction
                </li>
                <li>
                  Report any data misuse or breach to relevant legal authorities
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-emerald-500">
                8. Term & Termination
              </h3>
              <p>
                This Agreement becomes effective upon the User's first visit or
                registration and:
              </p>
              <ul className="list-disc space-y-1 pl-6">
                <li>
                  Remains in force throughout the User's active use of the
                  platform
                </li>
                <li>
                  Survives for 5 years post last access or use of any Scaninfoga
                  services
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-emerald-500">
                9. Governing Law & Jurisdiction
              </h3>
              <p>
                This Agreement shall be governed by the laws of India, and any
                disputes shall be resolved in the courts of Surat, Gujarat,
                India.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-emerald-500">10. Acceptance</h3>
              <p>
                By using the Scaninfoga website or registering on the platform,
                the User automatically agrees to all the terms of this NDA and
                the Company's Privacy Policy and Terms of Service.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-emerald-500">Contact</h3>
              <p>Scaninfoga Solutions Private Limited</p>
              <p>Email: support@scaninfoga.com</p>
              <p>
                Website:{' '}
                <strong className="text-emerald-500">
                  https://www.scaninfoga.com
                </strong>
              </p>
            </div>
          </div>
        </ScrollArea>

        <div className="flex items-center space-x-2 py-4">
          <Checkbox
            id="terms-checkbox"
            checked={isChecked}
            onCheckedChange={(checked) => setIsChecked(checked as boolean)}
          />
          <label
            htmlFor="terms-checkbox"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I agree to the Terms and Conditions
          </label>
        </div>

        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={handleAgree}
            disabled={!isChecked}
            className={!isChecked ? 'cursor-not-allowed opacity-50' : ''}
          >
            Agree
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default TermsModal;
