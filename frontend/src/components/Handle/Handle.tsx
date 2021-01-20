import React from "react";
import MarkDownContainer from "../../containers/MarkDown/MarkDownContainer";
import { ReactComponent as Option } from "../../assets/images/option.svg";
import "./Handle.scss";
import { CategoryType } from "../../util/types/Category";
import HandleCategoryOption from "./HandleCategoryOption";

interface HandleProps {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  titleRef: React.RefObject<HTMLTextAreaElement>;
  desc: string;
  setDesc: React.Dispatch<React.SetStateAction<string>>;
  descRef: React.RefObject<HTMLTextAreaElement>;
  content: string;
  contentRef: React.RefObject<HTMLTextAreaElement>;
  writeCancelHandler: () => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleInsertImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  preview: string | ArrayBuffer | null;
  fileName: string;
  clearImageHandler: () => void;
  categories: CategoryType[];
  category: string;
  showOption: boolean;
  setShowOption: React.Dispatch<React.SetStateAction<boolean>>;
  categoryItemHandler: (name: string, idx: number) => void;
  writeClickHandler: () => void;
  saveClickHandler: () => void;
  keyDownHandler: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  changeHandler: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  scrollDownRef: React.RefObject<HTMLDivElement>;
}

const Handle = ({
  title,
  setTitle,
  titleRef,
  desc,
  setDesc,
  descRef,
  content,
  contentRef,
  writeCancelHandler,
  handleImageChange,
  handleInsertImage,
  preview,
  fileName,
  clearImageHandler,
  categories,
  category,
  showOption,
  setShowOption,
  categoryItemHandler,
  writeClickHandler,
  saveClickHandler,
  keyDownHandler,
  changeHandler,
  scrollDownRef,
}: HandleProps) => {
  return (
    <>
      <div className="Handle">
        <div className="Handle-Wrapper">
          <div className="Handle-Wrapper-Area">
            <div className="Handle-Wrapper-Area-Label">
              <p className="Handle-Wrapper-Area-Label-Inner">글 작성</p>
              <div className="Handle-Wrapper-Area-Label-Buttons">
                <button
                  className="Handle-Wrapper-Area-Label-Buttons-Confirm"
                  onClick={() => writeClickHandler()}
                >
                  작성하기
                </button>
                <button
                  className="Handle-Wrapper-Area-Label-Buttons-Save"
                  onClick={() => saveClickHandler()}
                >
                  임시 저장
                </button>
                <button
                  className="Handle-Wrapper-Area-Label-Buttons-Cancel"
                  onClick={() => writeCancelHandler()}
                >
                  나가기
                </button>
              </div>
            </div>
            <div className="Handle-Wrapper-Area-Container">
              <textarea
                ref={titleRef}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="Handle-Wrapper-Area-Container-Title"
                placeholder="제목을 입력해주세요."
              />
              <textarea
                ref={descRef}
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className="Handle-Wrapper-Area-Container-Description"
                placeholder="설명을 입력해주세요."
              />
              <textarea
                ref={contentRef}
                value={content}
                onKeyDown={(e) => keyDownHandler(e)}
                onChange={(e) => changeHandler(e)}
                className="Handle-Wrapper-Area-Container-Content"
                placeholder="자! 이제 마음껏 이야기를 써보죠!"
              />
            </div>
          </div>
          <div className="Handle-Wrapper-Preview">
            <div className="Handle-Wrapper-Preview-Label">
              <p className="Handle-Wrapper-Preview-Label-Inner">미리보기</p>
            </div>
            <div className="Handle-Wrapper-Preview-Area">
              <p className="Handle-Wrapper-Preview-Area-Title">{title}</p>
              <p className="Handle-Wrapper-Preview-Area-Description">{desc}</p>
              {preview && (
                <img
                  src={preview.toString()}
                  className="Handle-Wrapper-Preview-Area-Image"
                />
              )}
              <MarkDownContainer
                className="Handle-Wrapper-Preview-Area-Content"
                scrollDownRef={scrollDownRef}
              >
                {content}
              </MarkDownContainer>
            </div>
          </div>
        </div>
        <div className="Handle-InsertImage">
          <p className="Handle-InsertImage-Title">이미지를 추가해보세요!</p>
          <label htmlFor="insert_image" className="Handle-InsertImage-Button">
            업로드
          </label>
          <input
            id="insert_image"
            type="file"
            accept="image/png, image/jpeg"
            onChange={(e) => handleInsertImage(e)}
          />
        </div>
        <div className="Handle-Control">
          <div className="Handle-Control-Wrapper">
            <div className="Handle-Control-Wrapper-Button">
              <p className="Handle-Control-Wrapper-Button-FileName">
                {fileName || "썸네일 이미지를 선택해주세요."}
              </p>
              {fileName ? (
                <div
                  onClick={() => clearImageHandler()}
                  className="Handle-Control-Wrapper-Button-Delete"
                >
                  삭제
                </div>
              ) : (
                <label
                  htmlFor="thumbnail"
                  className="Handle-Control-Wrapper-Button-Label"
                >
                  업로드
                </label>
              )}
            </div>
            <input
              id="thumbnail"
              type="file"
              accept="image/png, image/jpeg"
              onChange={(e) => handleImageChange(e)}
            />
            <div
              className="Handle-Control-Wrapper-Category"
              onClick={() => setShowOption(true)}
            >
              <p className="Handle-Control-Wrapper-Category-Name">
                {category || "카테고리"}
              </p>
              <Option />
              {showOption && (
                <HandleCategoryOption
                  categories={categories}
                  setShowOption={setShowOption}
                  categoryItemHandler={categoryItemHandler}
                />
              )}
            </div>
          </div>
          <div className="Handle-Control-Buttons">
            <button
              className="Handle-Control-Buttons-Confirm"
              onClick={() => writeClickHandler()}
            >
              작성하기
            </button>
            <button
              className="Handle-Control-Buttons-Save"
              onClick={() => saveClickHandler()}
            >
              임시 저장
            </button>
            <button
              className="Handle-Control-Buttons-Cancel"
              onClick={() => writeCancelHandler()}
            >
              나가기
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Handle;
