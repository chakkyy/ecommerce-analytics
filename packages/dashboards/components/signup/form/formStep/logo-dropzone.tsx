import { useCallback, useState } from 'react';
import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'next-i18next';
import UploadIcon from '@icons/upload-icon';
import CircleCheckIcon from '@icons/circle-check-icon';
import CloseIcon from '@icons/close-icon';
import TextBody from '@ui/text-body';
import { Theme } from '../../../../theme/theme';

const StyledDropzoneContainer = styled.div`
  margin-top: 40px;
  display: flex;
  gap: 32px;
  align-items: center;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.lg}) {
    gap: 16px;
  }
`;

const StyledDropzoneContent = styled.div``;

const StyledDropzoneClickable = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.lg}) {
    gap: 0px;
    svg {
      margin-bottom: 16px;
    }
  }
`;

const StyledImagePreview = styled.div`
  width: 180px;
  height: 180px;
  background: ${({ theme }: { theme: Theme }) => theme.colors.lightGrey};
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.lg}) {
    width: 50%;
    padding: 0px;
    height: 155px;
    justify-content: center;
  }
`;

const StyledLogoWrapper = styled.div`
  background: #fff;
  border-radius: 50%;
  width: 100%;
  height: 100%;
  border: 1px solid #dddddd;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
`;

const StyledDropzone = styled.div`
  width: 392px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 35px 43px;
  border: 1px dashed ${({ theme }: { theme: Theme }) => theme.colors.grey};
  border-radius: 10px;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.lg}) {
    width: 50%;
    padding: 0px;
    height: 155px;
    justify-content: center;
  }
`;

const StyledDropzoneTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledDropzoneTextDesktop = styled(TextBody)`
  color: ${({ theme }: { theme: Theme }) => theme.colors.grey};
  text-align: center;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`;
const StyledDropzoneText = styled(TextBody)`
  color: ${({ theme }: { theme: Theme }) => theme.colors.grey};
  text-align: center;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.lg}) {
    font-size: 14px;
  }
`;

const StyledDropdzoneTextMobile = styled(TextBody)`
  color: ${({ theme }: { theme: Theme }) => theme.colors.grey};
  text-align: center;
  font-weight: 300;
  margin-bottom: 4px;
  @media (min-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`;

const StyledTextPreviewMobile = styled.p`
  font-size: 14px;
  font-family: Roboto;
  font-weight: 300;
  line-height: 130%;
  @media (min-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`;
const StyledUploadedFileWrapper = styled.div`
  position: relative;
`;

const StyledUploadedFile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 158px;
  background: ${({ theme }: { theme: Theme }) => theme.colors.almostWhite};
  border-radius: 8px;
  padding: 24px 47px;
  position: relative;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.lg}) {
    width: auto;
  }
`;

const StyledCloseIconButton = styled.button`
  all: unset;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.lg}) {
    svg {
      width: 16px;
      height: 16px;
    }
  }
`;

const StyledLogoExtensionContainer = styled.div``;

const StyledError = styled.div`
  color: ${({ theme }: { theme: Theme }) => theme.colors.redError};
  max-width: 400px;
  margin-top: 8px;
`;

type PreviewImageProps = {
  image: HTMLImageElement | null;
};

/* eslint-disable */
type LogoDropzoneProps = {
  onChange: (e: any) => void;
};

const LogoDropzone = ({ onChange }: LogoDropzoneProps) => {
  const [previewImage, setPreviewImage] = useState<PreviewImageProps>({ image: null });
  const [myFile, setMyFile] = useState<any>([]);

  const { t } = useTranslation('signup');

  const onFileDrop = useCallback(
    (acceptedFiles: any) => {
      const fileToUpload = acceptedFiles[0];
      setPreviewImage({ image: null });
      setMyFile(acceptedFiles);

      const reader = new FileReader();
      reader.onload = (e: any) => {
        // preview image
        const image = new Image();
        image.src = e.target.result;
        image.onload = () => {
          setPreviewImage({ image });
        };

        // rhf
        if (reader.result) {
          const binaryStr = reader.result;
          onChange({
            data: binaryStr,
            name: fileToUpload.name,
          });
        }
      };

      reader.readAsDataURL(fileToUpload);
    },
    [myFile]
  );

  const removeFile = (e: any) => {
    e.preventDefault();
    setMyFile([]);
    setPreviewImage({ image: null });
    onChange({
      data: '',
      name: '',
    });
  };

  const { fileRejections, getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onFileDrop,
    maxFiles: 1,
    // 500kb
    maxSize: 500000,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/svg': [],
      'image/svg+xml': [],
    },
  });

  function trimStringOnMiddle(str: string) {
    const maxLength = 10;
    if (str.length <= maxLength) return str;
    const extensionStartIndex = str.lastIndexOf('.');
    const extension = str.slice(extensionStartIndex);
    const start = str.slice(0, 5);
    const endIndex = str.lastIndexOf('.');
    const end = str.slice(endIndex - 5, endIndex);
    return `${start}...${end}${extension}`;
  }

  const UploadedFile = () => {
    return (
      <>
        {myFile.map((file: any) => (
          <StyledUploadedFile key={file.path}>
            <StyledLogoExtensionContainer>
              <CircleCheckIcon width={38} height={38} fill='#7E7E7E' />
            </StyledLogoExtensionContainer>
            <div>
              <StyledDropzoneText>{trimStringOnMiddle(file.path)}</StyledDropzoneText>
              <StyledDropzoneText variant='smallLight'>{Math.ceil(file.size / 1000)} kB</StyledDropzoneText>
            </div>
          </StyledUploadedFile>
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
                <TextBody variant='smallLight' key={e.code}>
                  {e.code === 'file-invalid-type'
                    ? t('ERROR.INVALID_IMAGE_FILE_TYPE')
                    : e.code === 'file-too-large'
                    ? t('ERROR.FILE_TOO_LARGE')
                    : e.message}
                </TextBody>
              );
            })}
          </StyledError>
        );
      })}
    </>
  );

  const getCustomRootProps = () => {
    if (myFile.length > 0) {
      return {
        onClick: (event: any) => event.stopPropagation(),
      };
    }
    return {};
  };

  return (
    <>
      <StyledDropzoneContainer>
        <StyledDropzone {...getRootProps(getCustomRootProps())}>
          <input {...getInputProps({ onChange })} />
          <StyledDropzoneContent>
            {myFile.length > 0 ? (
              <StyledUploadedFileWrapper>
                <UploadedFile />
                <StyledCloseIconButton onClick={removeFile}>
                  <CloseIcon width={20} height={20} />
                </StyledCloseIconButton>
              </StyledUploadedFileWrapper>
            ) : (
              <StyledDropzoneClickable>
                <UploadIcon />
                <StyledDropzoneTextContainer>
                  <StyledDropzoneTextDesktop variant='smallLight'>
                    {isDragActive ? t('FILE.IMAGE.DROP') : t('FILE.IMAGE.DRAG')}
                  </StyledDropzoneTextDesktop>
                  <StyledDropzoneTextDesktop variant='smallLight'>
                    {isDragActive ? t('FILE.IMAGE.UPLOAD') : t('FILE.IMAGE.SELECT')}
                  </StyledDropzoneTextDesktop>
                </StyledDropzoneTextContainer>
                <StyledDropdzoneTextMobile>Subí tu logo</StyledDropdzoneTextMobile>
                <StyledDropzoneText variant='smallLight'>{t('FILE.IMAGE.ACCEPTED')}</StyledDropzoneText>
              </StyledDropzoneClickable>
            )}
          </StyledDropzoneContent>
        </StyledDropzone>
        <StyledImagePreview>
          {myFile.length > 0 ? (
            <StyledLogoWrapper>
              <img src={previewImage?.image?.src} alt='company logo' />
            </StyledLogoWrapper>
          ) : (
            <StyledTextPreviewMobile>Preview</StyledTextPreviewMobile>
          )}
        </StyledImagePreview>
      </StyledDropzoneContainer>
      {fileRejections.length > 0 && <RejectedFile />}
    </>
  );
};

export default LogoDropzone;
