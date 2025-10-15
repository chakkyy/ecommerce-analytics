import { useCallback } from 'react';
import styled from 'styled-components';

import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'next-i18next';
import UploadIcon from '@icons/upload-icon';
import CircleCheckIcon from '@icons/circle-check-icon';
import CloseIcon from '@icons/close-icon';
import TextBody from '@ui/text-body';
import AlertIcon from '@icons/alert-icon';
import CsvIcon from '@icons/csv-icon';
import { Theme } from '../../theme/theme';

const StyledDropzoneContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  height: 130px;
`;

const StyledDropzone = styled.div<{ isUploadFile?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${p => (p.isUploadFile ? '70px 0px' : '35px 43px')};
  border: 1px dashed ${({ theme }: { theme: Theme }) => theme.colors.grey};
  border-radius: 10px;
  cursor: pointer;
`;

const StyledDropzoneTextContainerDesktop = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`;

const StyledDropzoneTextContainerMobile = styled.div`
  @media (min-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`;
const StyledDropzoneText = styled(TextBody)<{ isUploadFile?: boolean }>`
  text-align: center;
  color: ${p =>
    p.isUploadFile
      ? ({ theme }: { theme: Theme }) => theme.colors.black
      : ({ theme }: { theme: Theme }) => theme.colors.grey};
  font-weight: ${p => p.isUploadFile && '400'};
  font-size: ${p => p.isUploadFile && '16px'};
  line-height: ${p => p.isUploadFile && '150%'};
`;

const AlertWrapper = styled.div`
  background: ${({ theme }: { theme: Theme }) => theme.colors.lightRed};
  height: 56px;
  display: flex;
  align-items: center;
  border-radius: 8px;
  padding: 16px 24px;
  gap: 16px;
  margin-top: 40px;
  width: max-content;
`;

const StyledTextContent = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
`;

const StyledTextError = styled.h1`
  font-family: 'Roboto', sans-serif;
  color: ${({ theme }: { theme: Theme }) => theme.colors.redError};
  font-weight: 300;
  font-size: 14px;
  line-height: 130%;
`;

const StyledTextAlert = styled(StyledTextError)`
  color: ${({ theme }: { theme: Theme }) => theme.colors.black};
`;

const StyledUploadedFile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 158px;
  height: 136px;
  background: ${({ theme }: { theme: Theme }) => theme.colors.almostWhite};
  border-radius: 8px;
  padding: 24px 47px;
  position: relative;
`;

const StyledUpload = styled(StyledUploadedFile)`
  width: max-content;
`;

const StyledCloseIconWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const StyledLogoExtensionContainer = styled.div``;

const StyledError = styled.div`
  color: ${({ theme }: { theme: Theme }) => theme.colors.redError};
  max-width: 400px;
  margin-top: 8px;
`;

const StyledAlert = styled.p`
  font-weight: 300;
  font-size: 14px;
  line-height: 130%;
  color: ${({ theme }: { theme: Theme }) => theme.colors.grey};
  margin-top: 16px;
`;

/* eslint-disable */
type LogoDropzoneProps = {
  onChange: (e: any) => void;
  isUploadFile?: boolean;
};

const CSVDropzone = ({ onChange, isUploadFile }: LogoDropzoneProps) => {
  const { t } = useTranslation('signup');

  const onFileDrop = useCallback((files: any) => {
    // do things
  }, []);

  const { acceptedFiles, fileRejections, getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onFileDrop,
    maxFiles: 1,
    maxSize: 1073741824,
    accept: {
      'text/csv': [],
    },
  });

  const UploadedFile = () => {
    return (
      <>
        {acceptedFiles.map((file: any) => (
          <>
            {isUploadFile ? (
              <StyledUpload key={file.path}>
                <StyledCloseIconWrapper>
                  <CloseIcon width={20} height={20} />
                </StyledCloseIconWrapper>
                <StyledLogoExtensionContainer>
                  <CsvIcon />
                </StyledLogoExtensionContainer>
                <div>
                  <StyledDropzoneText>{file.path}</StyledDropzoneText>
                  <StyledDropzoneText variant='smallLight'>{Math.ceil(file.size / 1000)} kB</StyledDropzoneText>
                </div>
              </StyledUpload>
            ) : (
              <StyledUploadedFile key={file.path}>
                <StyledCloseIconWrapper>
                  <CloseIcon width={20} height={20} />
                </StyledCloseIconWrapper>
                <StyledLogoExtensionContainer>
                  <CircleCheckIcon width={38} height={38} fill='#7E7E7E' />
                </StyledLogoExtensionContainer>
                <div>
                  <StyledDropzoneText>{file.path}</StyledDropzoneText>
                  <StyledDropzoneText variant='smallLight'>{Math.ceil(file.size / 1000)} kB</StyledDropzoneText>
                </div>
              </StyledUploadedFile>
            )}
          </>
        ))}
      </>
    );
  };

  const RejectedFile = () => (
    <>
      {fileRejections.map(({ errors: fileError }: any) => {
        return (
          <StyledError>
            {fileError.map((e: { code: string; message: string }) => {
              return (
                <>
                  {isUploadFile ? (
                    <AlertWrapper key={e.code}>
                      <AlertIcon />
                      <StyledTextContent>
                        {e.code === 'file-too-large' && (
                          <>
                            <StyledTextError>{t('ERROR.ERROR_UPLOAD')}</StyledTextError>
                            <StyledTextAlert>{t('ERROR.ERROR_UPLOAD_MSG')}</StyledTextAlert>
                          </>
                        )}
                      </StyledTextContent>
                    </AlertWrapper>
                  ) : (
                    <TextBody variant='smallLight' key={e.code}>
                      {e.code === 'file-invalid-type'
                        ? t('ERROR.INVALID_CSV_FILE_TYPE')
                        : e.code === 'file-too-large'
                        ? t('ERROR.FILE_TOO_LARGE')
                        : e.message}
                    </TextBody>
                  )}
                </>
              );
            })}
          </StyledError>
        );
      })}
    </>
  );

  return (
    <>
      <StyledDropzone {...getRootProps()} isUploadFile={isUploadFile}>
        <input {...getInputProps({ onChange })} />
        <StyledDropzoneContent>
          {acceptedFiles.length > 0 ? (
            <UploadedFile />
          ) : (
            <>
              <UploadIcon />
              <StyledDropzoneTextContainerMobile>{t('FILE.CSV.UPLOAD_CSV')}</StyledDropzoneTextContainerMobile>
              <StyledDropzoneTextContainerDesktop>
                <StyledDropzoneText variant='smallLight' isUploadFile={isUploadFile}>
                  {isDragActive ? t('FILE.CSV.DROP') : t('FILE.CSV.DRAG')}
                </StyledDropzoneText>
                <StyledDropzoneText variant='smallLight' isUploadFile={isUploadFile}>
                  {isDragActive ? t('FILE.CSV.UPLOAD') : t('FILE.CSV.SELECT')}
                </StyledDropzoneText>
                {isUploadFile && <StyledAlert>{t('FILE.CSV.MAXIMUN')}</StyledAlert>}
              </StyledDropzoneTextContainerDesktop>
            </>
          )}
        </StyledDropzoneContent>
      </StyledDropzone>
      {fileRejections.length > 0 && <RejectedFile />}
    </>
  );
};

export default CSVDropzone;
